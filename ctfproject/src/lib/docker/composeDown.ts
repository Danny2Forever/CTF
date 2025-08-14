import Docker from "dockerode";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const docker = new Docker({ host: serverRuntimeConfig.dockerHost });

export async function composeDown(
  userName: string,
  problemName: string,
  problemID: number
) {
  const allContainer = await docker.listContainers({ all: true });
  let stopped = false;

  for (const containerInfo of allContainer) {
    if (
      containerInfo.Names[0].includes(`${problemName}-${problemID}-${userName}`)
    ) {
      const container = docker.getContainer(containerInfo.Id);
      await container.stop();
      await container.remove();
      stopped = true;
    }
  }

  if (!stopped) throw new Error("No matching container found");

  return { message: "Container stopped and removed successfully" };
}
