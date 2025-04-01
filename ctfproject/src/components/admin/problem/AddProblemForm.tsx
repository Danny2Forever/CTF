"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ProblemSelector from './ProblemSelector';
import { useRouter } from 'next/navigation';
import { AddProblemData } from '../../../../types/problem';

const AddProblemForm = ({ courseId }: { courseId: string}) => {
    const [date, setDate] = useState<Date | undefined>();
    const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const router = useRouter()
    const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    const handleProblemSelect = (id: number) => {
        setSelectedProblemId(id);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset status messages
        setFormError(null);
        setFormSuccess(null);

        // Validate form
        if (!selectedProblemId) {
            setFormError("Please select a problem");
            return;
        }

        if (!date) {
            setFormError("Please select a due date");
            return;
        }

        // Prepare form data
        const AddProblemData: AddProblemData = {
            pro_id: selectedProblemId,
            expiration_date: new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };

        try {
            setIsSubmitting(true);
            console.log("Send data", JSON.stringify(AddProblemData) +" To course ID "+ courseId)

            // Send POST request to your endpoint
              const response = await fetch(`https://cyberctfproject.fewpz.xyz/api/problems/course/${courseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(AddProblemData),
              });

              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }

            // Process response if needed
            // const data = await response.json();

            // Show success message
            setFormSuccess("Problem assignment created successfully");

            // Reset form
            setSelectedProblemId(null);
            setDate(undefined);

        } catch (error) {
            console.error('Error submitting form:', error);
            setFormError("Failed to create problem assignment. Please try again.");
        } finally {
            setIsSubmitting(false);
            router.push(`/admin-panel/admin-course/${courseId}`)
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add Problem</CardTitle>
                <CardDescription>
                    Fill in the details to add problem to course
                </CardDescription>
                {formError && (
                    <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                        <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                )}
                {formSuccess && (
                    <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                        <AlertDescription>{formSuccess}</AlertDescription>
                    </Alert>
                )}
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid gap-4 py-2">
                        <ProblemSelector onSelectProblem={handleProblemSelect} />
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="due_date" className="text-right">
                                Due Date
                            </Label>
                            <div className="col-span-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : "Select a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-[#D9D9D9] text-black cursor-pointer hover:bg-black hover:text-white transition-all"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Add Problem"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default AddProblemForm