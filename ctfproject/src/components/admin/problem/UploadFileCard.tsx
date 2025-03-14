"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

interface UploadFileCardProps {
    pro_name: string;
    pro_id: string;
}

const UploadFileCard: React.FC<UploadFileCardProps> = ({ pro_name, pro_id }) => {
    const router = useRouter();
    const [uploadedFileName, setUploadedFileName] = useState<File | string>("Upload File");
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);
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
    };

    const handleSaveChanges = async () => {
        if (uploadedFileName === "Upload File") {
            setError("Please upload a file before saving.");
            return;
        }

        setIsSaving(true);
        setError(null);
        
        try {
            // Simulate a POST request
            try {
                const formData = new FormData();
                formData.append("problemName", pro_name);
                formData.append("problemID", pro_id);
                if (uploadedFile) {
                  formData.append("file", uploadedFile);
                  console.log(typeof(uploadedFile)) // Use the File object
                }
                console.log("Form Data:", formData.get("problemName"), formData.get("problemID"), formData.get("file"));
                const res = await fetch(
                  "http://141.11.158.213:3000/api/docker/upload-image",
                  {
                    method: "POST",
                    body: JSON.stringify(formData)
                  }
                );
                // const data = await res.json();
                setSuccess(`File successfully uploaded for Problem #${pro_id}`);
                router.push("/admin-panel")
                return;
                // console.log("File uploaded successfully");
                // console.log("Response:", data);
                // return data;
            } catch (error) {
                console.error("Error uploading file:", error);
                setError("Failed to upload file. Please try again.");
                return;
            }
            // You can choose to redirect after success or stay on the same page
            // router.push("/admin-panel")
        } catch (error) {
            setError("Failed to upload file. Please try again.");
            console.error("Upload error:", error);
        } finally {
            setIsSaving(false);
            // router.push("/admin-panel")
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
                            <Alert variant="destructive" className="mb-4 bg-red-50 text-red-800 border-red-200">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="problem_file" className="text-right">
                                File
                            </Label>
                            <Input 
                                type="file"
                                accept='.tar'
                                id="problem_file" 
                                placeholder="Choose File" 
                                className="col-span-3 cursor-pointer" 
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button 
                        onClick={() => router.push("/admin-panel")}
                        className="bg-gray-300 text-black hover:bg-gray-400 cursor-pointer"
                    >
                        Back to Admin Panel
                    </Button>
                    <Button 
                        type="submit" 
                        onClick={handleSaveChanges}
                        disabled={isSaving || uploadedFileName === "Upload File"}
                        className="bg-[#D9D9D9] text-black cursor-pointer hover:bg-black hover:text-white transition-all"
                    >
                        {isSaving ? "Saving..." : "Save changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default UploadFileCard