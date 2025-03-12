"use server";

import { CreateProblemData } from "../../types/problem";
import { CreateCourseData } from "../../types/course";
import { z } from "zod";

const courseSchema = z.object({
  course_name: z.string().min(1, "Course Name is required"),
  course_description: z.string().min(1, "Course Description is required"),
});

export async function submitCreateCourseForm(formData: FormData) {
  console.log("Create course Form submission started"); // Add this log to track execution

  try {
    const rawCourseData: CreateCourseData = {
      course_name: formData.get("course_name") as string,
      course_description: formData.get("course_description") as string,
    };

    console.log("Raw form data:", rawCourseData); // Log the raw data

    const validateCourseData = courseSchema.safeParse(rawCourseData);

    if (!validateCourseData.success) {
      console.log("Validation failed:", validateCourseData.error.format());
      return {
        message: "Course name and description are required",
        courseId: undefined,
      };
    }

    // POST here
    // Simulate creating a course with a random ID
    const newCourseId = Math.floor(Math.random() * 1000);
    console.log("Course created with ID:", newCourseId);

    return {
      message: "Course created successfully",
      courseId: newCourseId,
    };
  } catch (e) {
    console.error("Submit Form Error:", e);
    return {
      message: "Submit Form Error, Please try again",
      courseId: undefined,
    };
  }
}

const problemSchema = z.object({
  pro_name: z.string().min(1, "Problem name is required"),
  pro_description: z.string().min(1, "Problem Description is required"),
});

export async function submitCreateProblemForm(formData: FormData) {
  console.log("Creat problem Form submission started"); // Add this log to track execution

  try {
    const rawProblemData: CreateProblemData = {
      pro_name: formData.get("pro_name") as string,
      pro_description: formData.get("pro_description") as string,
    };

    console.log("Raw Problem Data", rawProblemData);

    const validateProblemData = problemSchema.safeParse(rawProblemData);

    if (!validateProblemData.success) {
      console.log("Validation failed:", validateProblemData.error.format());
      return {
        message: "Problem name and description are required",
        pro_id: undefined,
      };
    }

    try {
      const response = await fetch("http://141.11.158.213:3000/api/problems/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImdsb2JhbFBlcm1pc3Npb25zIjpbImFjY2Vzc19hbGxfY291cnNlcyIsImNyZWF0ZV9jb3Vyc2UiLCJkZWxldGVfY291cnNlIiwibWFuYWdlX3VzZXJzIl0sImNvdXJzZVBlcm1pc3Npb25zIjpbeyJjb3Vyc2VJZCI6NCwicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjUsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjo2LCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6NywicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjgsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjo5LCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6MywicGVybWlzc2lvbnMiOlsidmlld19ncmFkZXMiXX1dLCJpYXQiOjE3NDE3ODMyNTksImV4cCI6MTc0MTc4Njg1OX0.lj76efDjSWwUhrxFjdmD0F5eZIJxrB6FoFrpbnBg5ZM", //! change it to user token + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          pro_name: validateProblemData.data.pro_name,
          pro_description: validateProblemData.data.pro_description,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);
      console.log("Problem created with ID:", data.pro_id);
      return {
        message: "Problem created successfully",
        pro_name: validateProblemData.data.pro_name,
        pro_id: data.pro_id,
      }
    } catch (error) {
        console.error("Error creating problem:", error);
        return {
            message: "Problem creation failed",
            pro_name: undefined,
            pro_id: undefined,
        };
    }
  } catch (e) {
    console.error("Submit Form Error:", e);
    return {
      message: "Submit Form Error, Please try again",
      pro_id: undefined,
    };
  }
}
