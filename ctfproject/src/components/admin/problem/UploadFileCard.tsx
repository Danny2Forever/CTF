"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

interface UploadFileCardProps {
  pro_name: string;
  pro_id: string;
}

const UploadFileCard: React.FC<UploadFileCardProps> = ({
  pro_name,
  pro_id,
}) => {
  const router = useRouter();
  const [uploadedFileName, setUploadedFileName] = useState<File | string>(
    "Upload File"
  );
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      setUploadedFileName(e.target.files[0].name);
    } else {
      setUploadedFile(null);
      setUploadedFileName("Upload File");
    }
    setError(null);
    setSuccess(null);
    setProcessingStatus("");
  };

  const handleSaveChanges = async () => {
    if (uploadedFileName === "Upload File") {
      setError("Please upload a file before saving.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessingStatus("Uploading file...");

    try {
      // First upload the file
      try {
        const formData = new FormData();
        formData.append("problemName", pro_name.toLowerCase().replace(/\s+/g, '_'));
        formData.append("problemID", pro_id);
        if (uploadedFile) {
          formData.append("file", uploadedFile);
        }

        // Don't stringify FormData - send it directly
        const uploadRes = await fetch(
          "https://cyberctfproject.duckdns.org/api/docker/upload-image",
          {
            method: "POST",
            body: formData,
            // No Content-Type header - browser sets it with boundary for FormData
          }
        );

        // Check if response is JSON first
        const contentType = uploadRes.headers.get("content-type");
        let uploadSuccessful = false;

        if (contentType && contentType.includes("application/json")) {
          const data = await uploadRes.json();
          console.log("Response:", data);
          uploadSuccessful = uploadRes.ok;
        } else {
          // Handle text response
          const textResponse = await uploadRes.text();
          console.log("Text response:", textResponse);

          if (!uploadRes.ok) {
            throw new Error(textResponse || "Failed to upload file");
          }
          uploadSuccessful = true;
        }

        if (uploadSuccessful) {
          setProcessingStatus("File uploaded. Building image...");
          console.log("File uploaded successfully");

          // After successful upload, build the image and wait for completion
          await buildImage();
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError(
          `Failed to upload file: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsProcessing(false);
      setProcessingStatus("");
    }
  };

  const buildImage = async () => {
    try {
      setProcessingStatus("Building image... This may take a few minutes.");

      const res = await fetch(
        "https://cyberctfproject.duckdns.org/api/docker/build-image",
        {
          method: "POST",
          body: JSON.stringify({ problemID: pro_id, problemName: pro_name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to build Image");
      }

      // Only set success after image build is complete
      setSuccess(
        `File uploaded and image built successfully for Problem #${pro_id}`
      );
      return;
    } catch (error) {
      setError(
        `Failed to build Image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      console.error("Build error:", error);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upload Problem File</CardTitle>
          <CardDescription>
            Upload your .tar problem file for Problem #{pro_id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 py-2">
            {error && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-50 text-red-800 border-red-200"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            {isProcessing && processingStatus && (
              <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
                <AlertDescription>
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {processingStatus}
                  </div>
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="problem_file" className="text-right">
                File
              </Label>
              <Input
                type="file"
                accept=".tar"
                id="problem_file"
                placeholder="Choose File"
                className="col-span-3 cursor-pointer"
                onChange={handleFileChange}
                disabled={isProcessing}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => router.push("/admin-panel")}
            className="bg-gray-300 text-black hover:bg-gray-400 cursor-pointer"
            disabled={isProcessing}
          >
            Back to Admin Panel
          </Button>
          <Button
            type="submit"
            onClick={handleSaveChanges}
            disabled={isProcessing || uploadedFileName === "Upload File"}
            className="bg-[#D9D9D9] text-black cursor-pointer hover:bg-black hover:text-white transition-all"
          >
            {isProcessing ? "Processing..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadFileCard;
