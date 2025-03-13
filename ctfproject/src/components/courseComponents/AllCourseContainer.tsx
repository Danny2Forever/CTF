import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../../types/course";

type allCourse = Course[];

export default async function AllCourseContainer({}) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImdsb2JhbFBlcm1pc3Npb25zIjpbImFjY2Vzc19hbGxfY291cnNlcyIsImNyZWF0ZV9jb3Vyc2UiLCJkZWxldGVfY291cnNlIiwibWFuYWdlX3VzZXJzIl0sImNvdXJzZVBlcm1pc3Npb25zIjpbeyJjb3Vyc2VJZCI6NCwicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjUsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjo2LCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6NywicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjgsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjo5LCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6MTAsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjoxMSwicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjEyLCJwZXJtaXNzaW9ucyI6WyJhZGRfcHJvYmxlbSIsImVkaXRfY291cnNlIiwiZ3JhZGVfYXNzaWdubWVudHMiXX0seyJjb3Vyc2VJZCI6MTMsInBlcm1pc3Npb25zIjpbImFkZF9wcm9ibGVtIiwiZWRpdF9jb3Vyc2UiLCJncmFkZV9hc3NpZ25tZW50cyJdfSx7ImNvdXJzZUlkIjoxNCwicGVybWlzc2lvbnMiOlsiYWRkX3Byb2JsZW0iLCJlZGl0X2NvdXJzZSIsImdyYWRlX2Fzc2lnbm1lbnRzIl19LHsiY291cnNlSWQiOjMsInBlcm1pc3Npb25zIjpbInZpZXdfZ3JhZGVzIl19XSwiaWF0IjoxNzQxODk0NTY3LCJleHAiOjE3NDE4OTgxNjd9.S1rDrlWEJEcVMuOwd53x5fcJKzvENQrWK7Nj9Kxc4q0"
  const response = await fetch("http://141.11.158.213:3000/api/courses/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data: allCourse = await response.json();
  console.log(data);

  return (
    <div>
      {data.length > 0 ? (
        data.map((course) => (
          <CourseCard key={course.course_id} course={course} />
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}
