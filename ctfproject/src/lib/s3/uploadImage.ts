import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as path from "path";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export interface UploadResult {
  success: boolean;
  location?: string;
  key?: string;
  error?: string;
}

export interface FileData {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

const s3Client = new S3Client({
  region: serverRuntimeConfig.awsRegion ?? "us-east-1",
  credentials: {
    accessKeyId: serverRuntimeConfig.awsAccessKeyId ?? "",
    secretAccessKey: serverRuntimeConfig.awsSecretAccessKey ?? "",
    sessionToken: serverRuntimeConfig.awsSessionToken ?? undefined,
  },
});
const s3Bucket = serverRuntimeConfig.s3Bucket ?? "ctf-tae-storage";

export async function uploadImage(
  file: FileData,
  problemName: string,
  problemID: number
): Promise<UploadResult> {
  try {
    const extension = path.extname(file.originalname);
    const key = `${problemName}-${problemID}${extension}`;
    const uploadParams = {
      Bucket: s3Bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    await s3Client.send(new PutObjectCommand(uploadParams));
    const location = `https://${s3Bucket}.s3.${serverRuntimeConfig.awsRegion}.amazonaws.com/${key}`;
    return { success: true, location, key };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown upload error",
    };
  }
}