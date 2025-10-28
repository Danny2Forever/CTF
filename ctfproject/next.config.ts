import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverRuntimeConfig: {
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: process.env.S3_BUCKET,
    databaseUrl: process.env.DATABASE_URL,
    awsSessionToken: process.env.AWS_SESSION_TOKEN,
    dockerHost: process.env.DOCKER_HOST ?? "tcp://localhost:2375",
  },
  publicRuntimeConfig: {
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
  serverExternalPackages: ["dockerode"],
};

export default nextConfig;
