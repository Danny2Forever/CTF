"use client"

import React, { useActionState, useEffect } from 'react'
import { submitCreateCourseForm } from '@/actions/actions'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CreateCourseResponse } from '../../../../types/course'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

const initialState: CreateCourseResponse = {
    message: '',
    courseId: undefined
}

const CreateCourseForm = () => {
    const router = useRouter();
    const [state, action, isPending] = useActionState(
        async (state: CreateCourseResponse, formData: FormData) => await submitCreateCourseForm(formData),
        initialState
    )
    const hasError = state.message && !state.courseId

    useEffect(() => {
            if (state.courseId && !hasError && !isPending) {
                window.location.href = '/admin-panel';
            }
        }, [state.courseId, hasError, isPending]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create Course</CardTitle>
                <CardDescription>Learning have no limit, but brain</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <div className="grid w-full items-center gap-4">
                        {hasError && (
                            <Alert variant="destructive" className="mb-4 bg-red-50 text-red-800 border-red-200">
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        {state.courseId && (
                            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="course_name">Course Name</Label>
                            <Input
                                id="course_name"
                                name="course_name"
                                placeholder="Name of your course"
                                className={hasError ? "border-red-500" : ""}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="course_description">Course Description</Label>
                            <Textarea
                                id="course_description"
                                name="course_description"
                                placeholder="Course description"
                                className={hasError ? "border-red-500" : ""}
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button 
                            type="button" 
                            variant="outline" 
                            className='cursor-pointer'
                            onClick={router.back}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                disabled={isPending} 
                                className="bg-[#D9D9D9] text-black cursor-pointer hover:bg-black hover:text-white transition-all">
                                {isPending ? "Creating..." : "Create Course"}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreateCourseForm