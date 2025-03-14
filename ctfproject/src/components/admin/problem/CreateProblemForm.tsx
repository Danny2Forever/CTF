'use client';

import React, { useState } from 'react';
import { submitCreateProblemForm } from '@/actions/actions';
import UploadFileCard from '@/components/admin/problem/UploadFileCard';
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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from '@/components/ui/alert';

const CreateProblemForm = () => {
  const [problemName, setProblemName] = useState<string | undefined>('');
  const [problemDescription, setProblemDescription] = useState('');
  const [problemId, setProblemId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const formData = new FormData();
    formData.append('pro_name', problemName as string);
    formData.append('pro_description', problemDescription);

    try {
      const result = await submitCreateProblemForm(formData);
      
      if (result.pro_id) {
        setProblemName(result.pro_name);
        setProblemId(result.pro_id);
        setMessage(result.message);
      } else {
        setMessage(result.message || 'Problem creation failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  if (problemId) {
    return <UploadFileCard pro_name={problemName || ''} pro_id={problemId.toString()} />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Problem</CardTitle>
        <CardDescription>
          Fill in the details to create a new problem
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid gap-4 py-2">
            {message && (
              <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pro_name" className="text-right">
                Problem Name
              </Label>
              <Input
                id="pro_name"
                value={problemName}
                onChange={(e) => setProblemName(e.target.value)}
                className={`col-span-3 ${message && !problemName && "border-red-500"}`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pro_description" className="text-right">
                Description
              </Label>
              <Textarea
                id="pro_description"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className={`col-span-3 ${message && !problemDescription && "border-red-500"}`}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={isCreating}
            variant="default"
            className="cursor-pointer hover:scale-105 transition duration-300 mt-4"
          >
            {isCreating ? "Creating..." : "Create Problem"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateProblemForm;