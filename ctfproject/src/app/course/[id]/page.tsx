import React from "react";
import CourseHeader from "@/components/courseComponents/CourseHeader";
import CourseDescription from "@/components/courseComponents/CourseDescription";
import CourseOutline from "@/components/courseComponents/CourseOutline";

export default function CourseDetail() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-[#D9D9D9] w-full max-w-5xl p-6 rounded-lg shadow-lg flex flex-col h-full">
        <CourseHeader />
        <CourseDescription />
        <CourseOutline />
      </div>
    </div>
  );
}
