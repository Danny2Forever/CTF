import { CreateProblemData } from "../../types/problem";
import { CreateCourseData, CreateCourseResponse } from "../../types/course";
import { z } from "zod";
import { getToken } from "@/utils/auth";

const courseSchema = z.object({
  course_name: z.string().min(1, "Course Name is required"),
  course_description: z.string().min(1, "Course Description is required"),
});

export async function submitCreateCourseForm(formData: FormData) {
  console.log("Create course Form submission started"); // Add this log to track execution

  try {
    const rawCourseData: CreateCourseData = {
      course_name: (formData.get("course_name") as string)
        .toLowerCase()
        .replace(/\s+/g, "_"),
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

    console.log(validateCourseData);
    console.log("JSON", JSON.stringify(validateCourseData));

    // POST here
    const token = getToken();

    console.log("Token", token); // Log the token

    const response = await fetch(
      "https://cyberctfproject.fewpz.xyz/api/courses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          course_name: validateCourseData.data.course_name,
          course_description: validateCourseData.data.course_description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data: CreateCourseResponse = await response.json();
    // Simulate creating a course with a random ID
    console.log("Course created with ID:", data.courseId);

    return {
      message: data.message,
      courseId: data.courseId,
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
      const token = getToken();
      console.log("Token", token); // Log the token 
      const response = await fetch(
        "https://cyberctfproject.fewpz.xyz/api/problems/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            pro_name: validateProblemData.data.pro_name,
            pro_description: validateProblemData.data.pro_description,
          }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data);
      console.log("Problem created with ID:", data.pro_id);
      return {
        message: "Problem created successfully",
        pro_name: validateProblemData.data.pro_name,
        pro_id: data.pro_id,
      };
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
