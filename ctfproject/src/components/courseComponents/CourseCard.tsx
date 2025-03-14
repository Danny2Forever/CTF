"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Course } from "../../../types/course";

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<"idle" | "success" | "error">("idle");

  const handleEnroll = async () => {
    try {
      setIsEnrolling(true);
      setEnrollmentStatus("idle");
      
      const response = await fetch(`http://141.11.158.213:3000/api/courses/${course.course_id}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to enroll');
      }

      const data = await response.json();
      console.log('Enrollment successful:', data);
      setEnrollmentStatus("success");
      
      // Optionally refresh the page or navigate to enrolled courses
      router.push(`/course/${course.course_id}`);
      // Or just refresh the current page to show updated status
      // router.refresh();
      
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setEnrollmentStatus("error");
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-4xl flex items-center w-full mt-7">
      <div className="w-64 h-64 bg-gray-300 rounded-4xl overflow-hidden">
        {/* Add image or content here */}
      </div>

      <div className="ml-16 flex-1">
        <h2 className="text-4xl font-bold pr-6 break-words whitespace-normal line-clamp-2">
          {course.course_name}
        </h2>
        <p className="text-sm text-gray-500 mt-2">{course.description}</p>
        
        {enrollmentStatus === "success" && (
          <p className="text-green-500 mt-2">Successfully enrolled!</p>
        )}
        
        {enrollmentStatus === "error" && (
          <p className="text-red-500 mt-2">Failed to enroll. Please try again.</p>
        )}
      </div>

      {/* Enroll Button */}
      <Button
        variant="outline"
        onClick={handleEnroll}
        disabled={isEnrolling || enrollmentStatus === "success"}
        className="bg-text-gray-600 rounded-3xl cursor-pointer"
      >
        {isEnrolling ? "Enrolling..." : enrollmentStatus === "success" ? "Enrolled" : "Enroll Course"}
      </Button>
    </div>
  );
};

export default CourseCard;