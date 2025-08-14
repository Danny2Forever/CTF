import Docker from "dockerode";
import crypto from "crypto";
import * as net from "net";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const docker = new Docker({ host: serverRuntimeConfig.dockerHost });

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
  const image = await docker.getImage(imageName).inspect();
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
