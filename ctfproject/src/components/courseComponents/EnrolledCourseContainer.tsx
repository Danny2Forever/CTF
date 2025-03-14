"use client"

import React, { useEffect } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { Course } from "../../../types/course";

type allCourse = Course[];

export default function EnrolledCourseContainer({}) {
  const [data, setData] = React.useState<allCourse>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;
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
          <EnrolledCourseCard key={course.course_id} course={course} />
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}
