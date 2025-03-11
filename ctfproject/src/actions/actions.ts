"use server"

import { CreateProblemData } from '../../types/problem';
import { CreateCourseData } from '../../types/course';
import { z } from 'zod';

const courseSchema = z.object({
    course_name: z.string().min(1, "Course Name is required"),
    course_description: z.string().min(1, "Course Description is required"),
});

export async function submitCreateCourseForm(formData: FormData) {
    console.log("Create course Form submission started"); // Add this log to track execution

    try {
        const rawCourseData: CreateCourseData = {
            course_name: formData.get('course_name') as string,
            course_description: formData.get('course_description') as string
        };

        console.log("Raw form data:", rawCourseData); // Log the raw data

        const validateCourseData = courseSchema.safeParse(rawCourseData);

        if (!validateCourseData.success) {
            console.log("Validation failed:", validateCourseData.error.format());
            return {
                message: "Course name and description are required",
                courseId: undefined
            };
        }

        // POST here
        // Simulate creating a course with a random ID
        const newCourseId = Math.floor(Math.random() * 1000);
        console.log("Course created with ID:", newCourseId);


        return {
            message: "Course created successfully",
            courseId: newCourseId
        };
    } catch (e) {
        console.error("Submit Form Error:", e);
        return {
            message: "Submit Form Error, Please try again",
            courseId: undefined
        };
    }
}


const problemSchema = z.object({
    pro_name: z.string().min(1, "Problem name is required"),
    pro_description: z.string().min(1, "Problem Description is required")
})


export async function submitCreateProblemForm(formData: FormData) {
    console.log("Creat problem Form submission started"); // Add this log to track execution

    try {
        const rawProblemData: CreateProblemData = {
            pro_name: formData.get('pro_name') as string,
            pro_description: formData.get('pro_description') as string
        }

        console.log("Raw Problem Data", rawProblemData);

        const validateProblemData = problemSchema.safeParse(rawProblemData);

        if (!validateProblemData.success) {
            console.log("Validation failed:", validateProblemData.error.format());
            return {
                message: "Problem name and description are required",
                pro_id: undefined
            };
        }
        
        // POST here
        const newProblemId = Math.floor(Math.random() * 1000);
        console.log("Problem created with ID:", newProblemId);
        

        return {
            message: "Problem created successfully",
            pro_id: newProblemId
        };

    } catch (e) {
        console.error("Submit Form Error:", e);
        return {
            message: "Submit Form Error, Please try again",
            pro_id: undefined
        };
    }
}