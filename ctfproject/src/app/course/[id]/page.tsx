"use client"
import React from "react";
import CourseHeader from "@/components/courseComponents/CourseHeader";
import CourseDescription from "@/components/courseComponents/CourseDescription";
import OutlineContainer from "@/components/courseComponents/OutlineContainer";
import { Course as CourseType } from "../../../../types/course";
import { useParams } from "next/navigation";
import { getCourse } from "@/components/admin/course/GetCourse";

// Define the type for the route parameters
type CourseParams = {
  id: string;
};

export default function Course() {
  // Use the correct type for params
  const params = useParams<CourseParams>();
  const id = params.id;
  
  console.log("Course ID:", id);
  
  // Pass the id to your getCourse function
  const { course, user, isLoading, error } = getCourse(id);
      
  if (isLoading) {
    return <div>Loading...</div>
  }
      
  if (error) {
    return <div>Error: {error.message}</div>
  }
    
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-[#D9D9D9] w-full max-w-5xl p-6 rounded-lg shadow-lg flex flex-col h-full">
        <CourseHeader title={course?.course_name} />
        <CourseDescription description={course?.description} />
        <div className="mt-6 flex space-x-4 border-b pb-2">
          <button className="font-bold text-black">Course Outline</button>
          <button className="text-gray-500">Resources</button>
        </div>
        <OutlineContainer course_id={course?.course_id} />
      </div>
    </div>
  );
}