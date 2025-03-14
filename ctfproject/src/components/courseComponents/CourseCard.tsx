"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Course } from "../../../types/course";
import { 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Loader2 
} from "lucide-react";

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<"idle" | "success" | "error">("idle");

  const handleEnroll = async () => {
    try {
      setIsEnrolling(true);
      setEnrollmentStatus("idle");
      const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

      const response = await fetch(`http://141.11.158.213:3000/api/courses/${course.course_id}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to enroll');
      }

      const data = await response.json();
      console.log('Enrollment successful:', data);
      setEnrollmentStatus("success");

      // Navigate to course page after successful enrollment
      router.push(`/course/${course.course_id}`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setEnrollmentStatus("error");
    } finally {
      setIsEnrolling(false);
    }
  };

  // Format course name to be more readable
  const formatCourseName = (name: string) => 
    name.replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
        .trim();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-8 mb-6"
    >
      {/* Course Image Placeholder */}
      <div className="w-full md:w-64 h-64 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
        <BookOpen className="h-16 w-16 text-primary/50" />
      </div>

      {/* Course Details */}
      <div className="flex-1 w-full text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          {formatCourseName(course?.course_name)}
        </h2>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Enrollment Status Messages */}
        {enrollmentStatus === "success" && (
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span>Successfully enrolled!</span>
          </div>
        )}

        {enrollmentStatus === "error" && (
          <div className="flex items-center text-red-500 mb-4">
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>Failed to enroll. Please try again.</span>
          </div>
        )}

        {/* Enroll Button */}
        <Button
          onClick={handleEnroll}
          disabled={isEnrolling || enrollmentStatus === "success"}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white"
        >
          {isEnrolling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enrolling...
            </>
          ) : enrollmentStatus === "success" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Enrolled
            </>
          ) : (
            "Enroll Course"
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default CourseCard;