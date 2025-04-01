"use client";
import { useEffect, useState } from "react";

interface Container {
  username: string;
  problemName: string;
  problemID: number;
  skipRequest?: boolean; // Add optional parameter to control requests
}

interface ContainerUpResponse {
  success: boolean;
  message: string;
}

async function containerUp(data: Container): Promise<ContainerUpResponse> {
  // Only proceed if we have valid data
  if (!data.username || !data.problemName || !data.problemID) {
    console.log("Invalid container data, skipping request:", data);
    return { success: false, message: "Invalid container data" };
  }

  try {
    // Format the data exactly like in Postman
    const requestBody = {
      username: data.username,
      problemName: data.problemName,
      problemID: data.problemID,
    };

    console.log("Sending container up request:", requestBody);

    const response = await fetch(
      "https://cyberctfproject.fewpz.xyz/api/docker/compose-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    // Get response text first
    const responseText = await response.text();
    console.log("Raw response:", responseText);

    if (!response.ok) {
      console.error("Server error response:", responseText);
      throw new Error(
        `Failed to create container: ${response.status} ${responseText}`
      );
    }

    // Check if the response contains "Compose up successfully"
    const success = responseText.includes("Compose up successfully");

    return {
      success: success,
      message: success
        ? "Container started successfully"
        : "Container created but may not be running",
    };
  } catch (error) {
    console.error("Error in containerUp:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export function useContainerUp(userContainer: Container) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [response, setResponse] = useState<ContainerUpResponse | null>(null);

  useEffect(() => {
    // Skip if container data is invalid OR if skipRequest is true
    if (
      userContainer.skipRequest ||
      !userContainer.username ||
      !userContainer.problemName ||
      !userContainer.problemID
    ) {
      console.log(
        "Skipping container up request:",
        userContainer.skipRequest ? "explicitly skipped" : "incomplete data"
      );
      return;
    }

    let isMounted = true;

    async function loadContainer() {
      try {
        setLoading(true);
        setError(null);

        const result = await containerUp(userContainer);

        if (isMounted) {
          setResponse(result);
          setSuccess(result.success);
          if (!result.success) {
            setError(result.message);
          }
        }
      } catch (err) {
        console.error("Error in useContainerUp:", err);
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to create container"
          );
          setSuccess(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
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
    userContainer.skipRequest, // Add skipRequest to dependencies
  ]);

  return { loading, error, success, response };
}
