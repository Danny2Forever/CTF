import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Docker from "dockerode";
import { Readable } from "stream";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

// Debug logging
console.log("Server Runtime Config:", {
  awsRegion: serverRuntimeConfig.awsRegion,
  s3Bucket: serverRuntimeConfig.s3Bucket,
  dockerHost: serverRuntimeConfig.dockerHost,
  hasAccessKey: !!serverRuntimeConfig.awsAccessKeyId,
  hasSecretKey: !!serverRuntimeConfig.awsSecretAccessKey,
});

// Initialize S3 Client with better error handling
const s3Client = new S3Client({
  region: serverRuntimeConfig.awsRegion ?? "ap-southeast-2",
  credentials: {
    accessKeyId: serverRuntimeConfig.awsAccessKeyId ?? "",
    secretAccessKey: serverRuntimeConfig.awsSecretAccessKey ?? "",
    sessionToken: serverRuntimeConfig.awsSessionToken ?? undefined,
  },
});

// Initialize Docker with better error handling
const dockerHost =
  serverRuntimeConfig.dockerHost ?? "tcp://localhost:2375";
const docker = new Docker({
  host: "localhost",
  port: 2375,
});

const s3Bucket = serverRuntimeConfig.s3Bucket ?? "mytsvcbucket";

export async function buildImage(
  s3Key: string,
  problemName: string,
  problemID: number
) {
  try {
    console.log("Building image with params:", {
      s3Key,
      problemName,
      problemID,
    });

    // Test Docker connection first
    try {
      await docker.ping();
      console.log("Docker connection successful");
    } catch (dockerError) {
      console.error("Docker connection failed:", dockerError);
      throw new Error(
        `Docker connection failed: ${dockerError instanceof Error ? dockerError.message : dockerError}`
      );
    }

    // Get object from S3
    const getObjectParams = { Bucket: s3Bucket, Key: s3Key };
    console.log("Fetching from S3:", getObjectParams);

    const response = await s3Client.send(new GetObjectCommand(getObjectParams));

    if (!response.Body) {
      throw new Error("Empty response body from S3");
    }

    console.log("S3 object retrieved successfully");

    const tarStream = response.Body as Readable;
    const imageTag = `${problemName.toLowerCase()}-${problemID}:1.0.0`;

    console.log("Starting Docker build with tag:", imageTag);

    const stream = await docker.buildImage(tarStream, {
      t: imageTag,
      nocache: true,
      rm: true,
    });

    return new Promise((resolve, reject) => {
      docker.modem.followProgress(
        stream,
        (err, res) => {
          if (err) {
            console.error("Docker build error:", err);
            return reject(err);
          }

          if (!res) {
            return reject(new Error("No response from Docker build"));
          }

          const hasError = res.some((item) => item.error);
          if (hasError) {
            const errorItem = res.find((item) => item.error);
            console.error("Docker build failed:", errorItem?.error);
            return reject(
              new Error(`Build failed: ${errorItem?.error || "Unknown error"}`)
            );
          }

          console.log("Docker build completed successfully");
          resolve({ success: true, tag: imageTag });
        },
        (event) => {
          if (event.stream && !event.stream.startsWith(" ")) {
            process.stdout.write(event.stream);
          }
        }
      );
    });
  } catch (error) {
    console.error("Build image error:", error);
    throw error;
  }
}
