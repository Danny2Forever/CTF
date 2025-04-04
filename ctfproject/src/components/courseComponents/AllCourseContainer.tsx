"use client"

import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../../types/course";

type allCourse = Course[];

export default function AllCourseContainer({}) {
  const [data, setData] = React.useState<allCourse>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;
      const response = await fetch("https://cyberctfproject.fewpz.xyz/api/courses/all", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: allCourse = await response.json();
      setData(result);
    };

    fetchData();
  }, []);
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
