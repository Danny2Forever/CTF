"use client";
import React, { useState, useEffect, useCallback } from "react";
import QuizProblem from "@/components/quizComponents/QuizProblem";
import QuizRequire from "@/components/quizComponents/QuizRequire";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useProblemData } from "@/components/quizComponents/GetProblem";
import { useCreateContainer } from "@/components/quizComponents/GetContainer";
import { useContainerUp } from "@/components/quizComponents/GetComposeUp";
import AnswerBox from "@/components/quizComponents/AnswerBox";

type QuizParams = {
  quiz_id: string;
  id: string;
};

type CurrentProblem = {
  pro_id: number;
  pro_description: string;
  pro_name: string;
};

interface Container {
  username: string;
  problemName: string;
  problemID: number;
}

interface QuizRequireProps {
  host: string;
  port: number;
  sshuser: string;
  sshpass: string;
}

export default function QuizPage() {
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [problem, setProblem] = useState<CurrentProblem | undefined>(undefined);
  const [containerInfo, setContainerInfo] = useState<Container>({
    username: "66070009", // Updated to use consistent username
    problemName: "",
    problemID: 0,
  });
  const [shouldStartContainer, setShouldStartContainer] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isStoppingContainer, setIsStoppingContainer] = useState(false);

  // Get URL parameters
  const params = useParams<QuizParams>();
  const quiz_id = params?.quiz_id;
  const course_id = params?.id;

  // Parse course_id to number if it exists
  const courseIdNumber = course_id ? parseInt(course_id) : undefined;
  const quizIdNumber = quiz_id ? parseInt(quiz_id) : undefined;

  // Use the custom hook to fetch problems
  const { problems, loading, error } = useProblemData(courseIdNumber);

  // Find the current problem based on quiz_id
  useEffect(() => {
    if (problems.length > 0 && quiz_id) {
      const currentProblem = problems.find(
        (p) => p.pro_id === parseInt(quiz_id)
      );

      if (currentProblem) {
        setProblem(currentProblem);

        // Update container info when problem changes
        setContainerInfo({
          username: "66070009",
          problemName: currentProblem.pro_name,
          problemID: currentProblem.pro_id,
        });

        console.log("Current problem set:", currentProblem);
      }
    }
  }, [problems, quiz_id]);

  // Container hooks for SSH credentials
  const {
    flag,
    sshuser,
    sshpass,
    port,
    loading: containerLoading,
    error: containerError,
  } = useCreateContainer(containerInfo);

  // Function to manually trigger container startup
  const startContainer = useCallback(() => {
    if (
      containerInfo.username &&
      containerInfo.problemName &&
      containerInfo.problemID
    ) {
      console.log("Starting container with info:", {
        username: containerInfo.username,
        problemName: containerInfo.problemName,
        problemID: containerInfo.problemID,
      });

      // Set to true to trigger the API call
      setShouldStartContainer(true);
    } else {
      console.error("Cannot start container - missing data:", containerInfo);
    }
  }, [containerInfo]);

  // Function to stop container and redirect
  const stopContainer = useCallback(async () => {
    if (
      containerInfo.username &&
      containerInfo.problemName &&
      containerInfo.problemID
    ) {
      try {
        setIsStoppingContainer(true);
        console.log("Stopping container with info:", containerInfo);

        // Call API to terminate the container
        const response = await fetch(
          "https://141.11.158.213/api/docker/compose-down",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(containerInfo),
          }
        );

        if (response.ok) {
          console.log("Container stopped successfully");
          // Redirect to mycourse page
          router.push("/mycourse");
        } else {
          console.error("Failed to stop container:", response.statusText);
          // Still redirect even if there's an error
          router.push("/mycourse");
        }
      } catch (error) {
        console.error("Error stopping container:", error);
        // Still redirect even if there's an error
        router.push("/mycourse");
      } finally {
        setIsStoppingContainer(false);
      }
    }
  }, [containerInfo, router]);

  // Always call the hook, but control when it performs actions
  const {
    loading: containerUpLoading,
    error: containerUpError,
    success: containerUpSuccess,
    response: containerUpResponse,
  } = useContainerUp({
    ...containerInfo,
    // Only trigger actual API call when shouldStartContainer is true
    skipRequest: !shouldStartContainer,
  });

  // Log container response for debugging
  useEffect(() => {
    if (containerUpResponse) {
      console.log("Container response:", containerUpResponse);
    }
  }, [containerUpResponse]);

  // Log container status
  useEffect(() => {
    if (shouldStartContainer) {
      console.log("Container status:", {
        loading: containerUpLoading,
        error: containerUpError,
        success: containerUpSuccess,
      });
    }
  }, [
    containerUpLoading,
    containerUpError,
    containerUpSuccess,
    shouldStartContainer,
  ]);

  // Set up tab close detection
  useEffect(() => {
    // Function to handle tab closing
    const handleTabClose = async (event: BeforeUnloadEvent) => {
      // Only proceed if we have container info
      if (containerInfo.problemName && containerInfo.problemID) {
        // Display a confirmation dialog to the user
        event.preventDefault();
        event.returnValue =
          "Are you sure you want to leave? Your container will be terminated.";

        // Log the container termination attempt
        console.log(
          "Tab closing, container will be terminated:",
          containerInfo
        );

        try {
          // Call API to terminate the container
          const response = await fetch(
            "https://141.11.158.213/api/docker/compose-down",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(containerInfo),
            }
          );

          console.log("Container termination response:", response);
        } catch (error) {
          console.error("Failed to terminate container:", error);
        }
      }
    };

    // Register the event listener
    window.addEventListener("beforeunload", handleTabClose);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [containerInfo]);

  // Set up quiz props
  const quizprop: QuizRequireProps = {
    host: "141.11.158.213",
    port: port,
    sshuser: sshuser,
    sshpass: sshpass,
  };

  return (
    <>
      <div className="min-h-screen p-6 flex justify-center items-center -mt-16">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 justify-center gap-14">
          <div className="h-[78vh] w-full pb-3">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                Loading problem...
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full text-red-500">
                Error loading problem: {error.message}
              </div>
            ) : problem ? (
              <QuizProblem problem={problem} />
            ) : (
              <div className="flex justify-center items-center h-full">
                No problem found with ID: {quiz_id}
              </div>
            )}
          </div>

          <div className="lg:w-1/3 w-full flex flex-col space-y-4 justify-center items-center">
            <QuizRequire {...quizprop} />
            <div className="flex flex-col justify-center items-center gap-4">
              {/* Container start button */}
              <Button
                onClick={startContainer}
                className="w-96 h-11 rounded-4xl bg-blue-600 hover:bg-blue-700"
                disabled={
                  !problem ||
                  containerLoading ||
                  containerUpLoading ||
                  isStoppingContainer
                }
              >
                {containerLoading
                  ? "Setting up environment..."
                  : containerUpLoading
                  ? "Starting container..."
                  : "Start Container"}
              </Button>

              {/* Container stop button */}
              {containerUpSuccess && (
                <Button
                  onClick={stopContainer}
                  className="w-96 h-11 rounded-4xl bg-red-600 hover:bg-red-700"
                  disabled={isStoppingContainer}
                >
                  {isStoppingContainer
                    ? "Stopping..."
                    : "Stop Container & Return"}
                </Button>
              )}

              {/* Answer box */}
              <AnswerBox
                onSend={(answer) => {
                  if (answer === flag) {
                    setShowSuccessMessage(true);
                  } else {
                    setShowSuccessMessage(false);
                  }
                }}
              />
              {showSuccessMessage && (
                <div
                  className="w-md p-4 bg-green-100 border border-green-400 text-green-700 relative rounded-2xl"
                  role="alert"
                >
                  <span className="block sm:inline">
                    Your submission was successful!
                  </span>
                </div>
              )}
            </div>

            {/* Container Status Display */}
            <div className="w-96 p-3 border rounded-lg">
              <h3 className="font-medium text-center mb-2">Container Status</h3>

              <div className="flex items-center justify-between mb-2">
                <span>Container Creation:</span>
                {containerLoading ? (
                  <span className="text-yellow-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>
                    Loading...
                  </span>
                ) : containerError ? (
                  <span className="text-red-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    Failed
                  </span>
                ) : (
                  <span className="text-green-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    Ready
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Container Running:</span>
                {containerUpLoading ? (
                  <span className="text-yellow-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>
                    Starting...
                  </span>
                ) : containerUpError ? (
                  <span className="text-red-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    Failed
                  </span>
                ) : containerUpSuccess ? (
                  <span className="text-green-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    Running
                  </span>
                ) : isStoppingContainer ? (
                  <span className="text-yellow-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>
                    Stopping...
                  </span>
                ) : (
                  <span className="text-gray-500 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-gray-500 mr-2"></span>
                    Not Started
                  </span>
                )}
              </div>

              {/* Error messages */}
              {containerError && (
                <div className="text-red-500 text-sm mt-2 border-t pt-2">
                  Error: {containerError}
                </div>
              )}

              {containerUpError && (
                <div className="text-red-500 text-sm mt-2 border-t pt-2">
                  Error: {containerUpError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
