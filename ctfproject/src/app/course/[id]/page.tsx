import React from "react";
import CourseHeader from "@/components/courseComponents/CourseHeader";
import CourseDescription from "@/components/courseComponents/CourseDescription";
import OutlineContainer from "@/components/courseComponents/OutlineContainer";
import { Course as CourseType } from "../../../../types/course";

type CourseProps = {
  course: CourseType;
};

export default function Course({ course }: CourseProps) {
  console.log(course)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-[#D9D9D9] w-full max-w-5xl p-6 rounded-lg shadow-lg flex flex-col h-full">
        <CourseHeader title={course.course_name}/>
        <CourseDescription description={course.description} />
        <div className="mt-6 flex space-x-4 border-b pb-2">
          <button className="font-bold text-black">Course Outline</button>
          <button className="text-gray-500">Resources</button>
        </div>
        <OutlineContainer course_id={course.course_id} />
      </div>
    </div>
  );
}
