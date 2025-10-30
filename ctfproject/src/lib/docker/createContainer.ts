import Docker from "dockerode";
import crypto from "crypto";
import * as net from "net";
import getConfig from "next/config";
import * as os from "os";

const { serverRuntimeConfig } = getConfig();
function getDockerConnection() {
  const platform = os.platform();

  // If explicitly configured, use that
  if (serverRuntimeConfig.dockerHost) {
    const host = serverRuntimeConfig.dockerHost.replace("tcp://", "");
    const [hostname, port] = host.split(":");
    return { host: hostname, port: parseInt(port || "2375") };
  }

  // Default: try socket first (works on Linux/Mac/WSL2)
  if (platform === "linux" || platform === "darwin") {
    return { socketPath: "/var/run/docker.sock" };
  }

  // Windows: use named pipe or TCP
  if (platform === "win32") {
    return { socketPath: "//./pipe/docker_engine" };
    // Or use TCP if pipe doesn't work:
    // return { host: "localhost", port: 2375 };
  }

  // Fallback
  return { host: "localhost", port: 2375 };
}

const docker = new Docker(getDockerConnection());

interface TemplateData {
  username: string;
  problemName: string;
  problemID: number;
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function findRandomAvailablePort(
  minPort = 10000,
  maxPort = 65535
): Promise<number | null> {
  const attemptedPorts = new Set<number>();

  for (let attempt = 0; attempt < 50000; attempt++) {
    let port: number;
    do {
      port = getRandomInt(minPort, maxPort);
    } while (attemptedPorts.has(port));

    attemptedPorts.add(port);

    if (await isPortAvailable(port)) {
      return port;
    }
  }
  return null;
}

export async function createContainer(data: TemplateData) {
  const imageName = `${data.problemName}-${data.problemID}:1.0.0`;
  try {
    await docker.ping();
    console.log("Docker connection successful");
  } catch (dockerError) {
    console.error("Docker connection failed:", dockerError);
    throw new Error(
      `Docker not available: ${
        dockerError instanceof Error ? dockerError.message : String(dockerError)
      }`
    );
  }

  // Check if image exists
  let image;
  try {
    image = await docker.getImage(imageName).inspect();
    console.log("Image found:", imageName);
  } catch (imageError) {
    console.error("Image not found:", imageName, imageError);
    throw new Error(
      `Image ${imageName} not found. Please build the image first.`
    );
  }
  const imagePorts = Object.keys(image.Config.ExposedPorts);
  const containerPort = imagePorts[0];

  const availablePort = await findRandomAvailablePort();
  if (!availablePort) throw new Error("No available ports found");

  const randomFlag = crypto.randomBytes(10).toString("hex");
  const hash = crypto.createHash("md5").update(randomFlag).digest("hex");

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: image.Config.Cmd,
    ExposedPorts: { [containerPort]: {} },
    HostConfig: {
      PortBindings: {
        [containerPort]: [{ HostPort: availablePort.toString() }],
      },
      RestartPolicy: { Name: "unless-stopped" },
    },
    name: `${data.problemName}-${data.problemID}-${data.username}`,
    Env: [
      `SSH_USER=user${data.username}`,
      `SSH_PASSWORD=pass${data.username}`,
      `FLAG=${randomFlag}`,
    ],
  });

  return {
    containerId: container.id,
    flag: hash,
    sshUser: `user${data.username}`,
    sshPass: `pass${data.username}`,
    port: availablePort,
  };
}
