import Docker from "dockerode";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const docker = new Docker({ host: serverRuntimeConfig.dockerHost });

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
