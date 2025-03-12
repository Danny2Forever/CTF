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

const UploadFileCard = () => {
    const [uploadedFileName, setUploadedFileName] = useState<File | string>("Upload File");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadedFileName(e.target.files?.[0]?.name || "Upload File");
    };

    const handleSaveChanges = () => {
        // Any additional logic you want to perform on save
        console.log("File saved:", uploadedFileName);
    };

    return (
        <div className="w-full">
            <Card className="w-full max-w-[425px]">
                <CardHeader>
                    <CardTitle>Upload Problem File</CardTitle>
                    <CardDescription>
                        Upload your .tar problem file here
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="problem_file" className="text-right">
                                File
                            </Label>
                            <Input 
                                type="file" 
                                id="problem_file" 
                                placeholder="Choose File" 
                                className="col-span-3 cursor-pointer" 
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button 
                        type="submit" 
                        onClick={handleSaveChanges}
                        className="cursor-pointer"
                    >
                        Save changes
                    </Button>
                </CardFooter>
            </Card>
            <div className="mt-2">
                Selected file: {uploadedFileName as string}
            </div>
        </div>
    )
}

export default UploadFileCard