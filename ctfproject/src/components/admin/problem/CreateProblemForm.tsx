"use client"

import React, { useActionState, useEffect } from 'react'
import { submitCreateProblemForm } from '@/actions/actions'
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
import { CreateProblemResponse } from '../../../../types/problem'
import { Alert, AlertDescription } from '@/components/ui/alert'

const initialState: CreateProblemResponse = {
    message: '',
    pro_id: undefined
}

const CreateProblemForm = () => {
    const [state, action, isPending] = useActionState(
        async (state: CreateProblemResponse, formData: FormData) => await submitCreateProblemForm(formData),
        initialState
    )
    const hasError = state.message && !state.pro_id

    useEffect(() => {
        if (state.pro_id && !hasError && !isPending) {
            window.location.href = '/admin-panel/create-problem/upload';
        }
    }, [state.pro_id, hasError, isPending]);

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
                        {state.pro_id && (
                            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="pro_name">Problem Name</Label>
                            <Input
                                id="pro_name"
                                name="pro_name"
                                placeholder="Name of your problem"
                                className={hasError ? "border-red-500" : ""}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="pro_description">Problem Description</Label>
                            <Textarea
                                id="pro_description"
                                name="pro_description"
                                placeholder="Problem description"
                                className={hasError ? "border-red-500" : ""}
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button type="button" variant="outline" className='cursor-pointer'>Cancel</Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-[#D9D9D9] text-black cursor-pointer hover:bg-black hover:text-white transition-all">
                                {isPending ? "Going..." : "Next"}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreateProblemForm