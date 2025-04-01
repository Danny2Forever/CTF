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
    // Validate the data before sending
    if (!data.username || !data.problemName || data.problemID <= 0) {
      throw new Error("Invalid container data");
    }

    // Format the problem name to comply with Docker naming conventions
    const sanitizedProblemName = data.problemName
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-z0-9\-_.]/g, "") // Remove any other invalid characters
      .replace(/^[_.-]+/, ""); // Remove leading separators

    console.log("Creating container with sanitized data:", {
      username: data.username,
      problemName: sanitizedProblemName,
      problemID: data.problemID,
    });

    const response = await fetch(
      "https://cyberctfproject.fewpz.xyz/api/docker/create-compose",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          problemName: sanitizedProblemName,
          problemID: data.problemID,
        }),
      }
    );

    // Log the full response for debugging
    const responseText = await response.text();
    console.log("Raw create-compose response:", responseText);

    if (!response.ok) {
      throw new Error(`Failed to create container: ${responseText}`);
    }

    // Parse JSON response - need to parse the text we already got
    let containerData;
    try {
      containerData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      throw new Error("Invalid response format from server");
    }

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
  const [error, setError] = useState<Error | null>(null);
  const [hasAttemptedCreate, setHasAttemptedCreate] = useState<boolean>(false);

  useEffect(() => {
    // Skip if we don't have valid data
    if (
      !userContainer.username ||
      !userContainer.problemName ||
      userContainer.problemID <= 0
    ) {
      console.log("Skipping container creation - incomplete data");
      return;
    }

    // Skip if we've already tried to create this exact container
    const containerKey = `${userContainer.username}-${userContainer.problemName}-${userContainer.problemID}`;
    const existingContainer = sessionStorage.getItem(
      `container-${containerKey}`
    );

    if (existingContainer && hasAttemptedCreate) {
      try {
        const data = JSON.parse(existingContainer);
        console.log("Using cached container data:", data);
        setFlag(data.flag);
        setSshuser(data.sshuser);
        setSshpass(data.sshpass);
        setPort(data.port);
        return;
      } catch (err) {
        console.error("Error parsing cached container data:", err);
        // Continue with creating a new container if cache is invalid
      }
    }

    let isMounted = true;

    async function loadContainer() {
      try {
        setLoading(true);
        setError(null);

        console.log("Attempting to create container:", userContainer);
        const data = await createContainer(userContainer);

        if (isMounted) {
          setFlag(data.flag);
          setSshuser(data.sshuser);
          setSshpass(data.sshpass);
          setPort(data.port);

          // Cache the successful result
          sessionStorage.setItem(
            `container-${containerKey}`,
            JSON.stringify(data)
          );
        }
      } catch (err) {
        console.error("Error in useCreateContainer:", err);
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to create container")
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasAttemptedCreate(true);
        }
      }
    }

    loadContainer();

    return () => {
      isMounted = false;
    };
  }, [
    userContainer.username,
    userContainer.problemName,
    userContainer.problemID,
    hasAttemptedCreate,
  ]);

  return {
    flag,
    sshuser,
    sshpass,
    port,
    loading,
    error: error ? error.message : null,
  };
}
