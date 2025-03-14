"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Course } from "../../../types/course";

const EnrolledCourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/course/${course.course_id}`);
  };

  return (
    <div className="bg-white p-4 rounded-4xl flex items-center w-full mt-7">
      <div className="w-64 h-64 bg-gray-300 rounded-4xl overflow-hidden">
        {/* Add image or content here */}
      </div>

      <div className="ml-16 flex-1">
        <h2 className= "text-4xl font-bold pr-6 break-words whitespace-normal line-clamp-2">
          {course.course_name}
        </h2>
        <p className="text-sm text-gray-500 mt-2">{course.description}</p>
      </div>

      {/* Enroll Button */}
      <Button
        variant="outline"
        onClick={handleNavigate}
        className="bg-text-gray-600 rounded-3xl cursor-pointer"
      >
        Enter Course
      </Button>
    </div>
  );
};

export default EnrolledCourseCard;
