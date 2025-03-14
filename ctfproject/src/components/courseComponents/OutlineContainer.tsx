"use client"
import React, { use, useEffect, useState } from "react";
import CourseOutline from "./CourseOutline";
import { AllProblems } from "../../../types/problem";
import { fetchCourseData } from "./GetCourseUser";

interface CourseContainerProps {
  course_id: number | undefined;
}



export default function OutlineContainer({
  course_id,
}: CourseContainerProps) {
  
  const data = fetchCourseData(course_id);

  return (
    <div>
      {data.length > 0 ? (
        data.map((problem) => (
          <CourseOutline
            key={problem.pro_id}
            course_id={course_id}
            problem={problem}
          />
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}
