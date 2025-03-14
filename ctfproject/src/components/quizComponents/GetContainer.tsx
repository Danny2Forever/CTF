"use client";
import { useEffect, useState } from "react";

interface Container {
  username: string;
  problemName: string;
  problemID: number;
}

interface ContainerResponse {
  flag: string;
  sshuser: string;
  sshpass: string;
  port: number;
}

async function createContainer(data: Container): Promise<ContainerResponse> {
  try {
    console.log(data);
    const response = await fetch(
      "http://141.11.158.213:3000/api/docker/create-compose",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create container");
    }

    const containerData = await response.json();
    return containerData;
  } catch (error) {
    console.error("Error in createContainer:", error);
    throw error; // Re-throw to handle in the hook
  }
}

export function useCreateContainer(userContainer: Container) {
  const [flag, setFlag] = useState<string>("");
  const [sshuser, setSshuser] = useState<string>("");
  const [sshpass, setSshpass] = useState<string>("");
  const [port, setPort] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContainer() {
      try {
        setLoading(true);
        setError(null);
        const data = await createContainer(userContainer);
        setFlag(data.flag);
        setSshuser(data.sshuser);
        setSshpass(data.sshpass);
        setPort(data.port);
      } catch (err) {
        console.error("Error in useCreateContainer:", err);
        setError("Failed to create container");
      } finally {
        setLoading(false);
      }
    }

    loadContainer();
  }, [
    userContainer.username,
    userContainer.problemName,
    userContainer.problemID,
  ]);

  return { flag, sshuser, sshpass, port, loading, error };
}
