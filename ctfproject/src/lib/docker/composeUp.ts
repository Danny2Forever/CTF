import Docker from "dockerode";
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

export async function composeUp(
  userName: string,
  problemName: string,
  problemID: number
) {
  const allContainer = await docker.listContainers({ all: true });
  for (const containerInfo of allContainer) {
    if (
      containerInfo.Names[0].includes(`${problemName}-${problemID}-${userName}`)
    ) {
      const container = docker.getContainer(containerInfo.Id);
      const res = await container.start();
      return { message: "Container started successfully", res };
    }
  }
  throw new Error("Container not found");
}
