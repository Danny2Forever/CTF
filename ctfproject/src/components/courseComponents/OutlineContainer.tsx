import React from "react";
import CourseOutline from "./CourseOutline";
import { AllProblems } from "../../../types/problem";

interface CourseContainerProps {
  course_id: number;
}

async function fetchCourseData(course_id: number): Promise<AllProblems> {
  const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImdsb2JhbFBlcm1pc3Npb25zIjpbImFjY2Vzc19hbGxfY291cnNlcyIsImNyZWF0ZV9jb3Vyc2UiLCJkZWxldGVfY291cnNlIiwibWFuYWdlX3VzZXJzIl0sImNvdXJzZVBlcm1pc3Npb25zIjpbeyJjb3Vyc2VJZCI6NCwicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjUsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjo2LCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6NywicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjgsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjo5LCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6MTAsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjoxMSwicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjEyLCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6MTMsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjoxNCwicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjMsInBlcm1pc3Npb25zIjpbInZpZXdfZ3JhZGVzIl19XSwiaWF0IjoxNzQxODk0NTY3LCJleHAiOjE3NDE4OTgxNjd9.S1rDrlWEJEcVMuOwd53x5fcJKzvENQrWK7Nj9Kxc4q0"
  const response = await fetch(
    `http://141.11.158.213:3000/api/problems/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

export default async function OutlineContainer({
  course_id,
}: CourseContainerProps) {
  let data: AllProblems;

  try {
    data = await fetchCourseData(course_id);
  } catch (error) {
    console.error("Error fetching course data:", error);
    return <p className="text-red-500">Failed to load course data.</p>;
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((problem) => (
          <CourseOutline key={problem.pro_id} course_id={course_id} problem={problem} />
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}
