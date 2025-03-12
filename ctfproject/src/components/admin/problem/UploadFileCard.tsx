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
    pro_id: string;
}

const UploadFileCard: React.FC<UploadFileCardProps> = ({ pro_id }) => {
    const router = useRouter();
    const [uploadedFileName, setUploadedFileName] = useState<File | string>("Upload File");
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadedFileName(e.target.files?.[0]?.name || "Upload File");
        setError(null); // Clear error when a file is selected
        setSuccess(null); // Clear success message when a new file is selected
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
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Any additional logic you want to perform on save
            console.log("File saved:", uploadedFileName);
            console.log("For problem ID:", pro_id);
            
            setSuccess(`File successfully uploaded for Problem #${pro_id}`);
            // You can choose to redirect after success or stay on the same page
            // router.push("/admin-panel")
        } catch (error) {
            setError("Failed to upload file. Please try again.");
            console.error("Upload error:", error);
        } finally {
            setIsSaving(false);
            router.push("/admin-panel")
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