import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../../types/course";

type allCourse = Course[];

export default async function EnrolledCourseContainer({}) {
  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN;
  const response = await fetch(
    "http://141.11.158.213:3000/api/courses/enrolled",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

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
