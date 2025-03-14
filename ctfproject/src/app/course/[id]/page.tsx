"use client"
import React, { useState } from "react";
import { Loader2, BookOpen, FileText } from "lucide-react";
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

// Enum for view types
enum CourseViewType {
  Outline = "OUTLINE",
  Resources = "RESOURCES"
}

export default function Course() {
  // Use the correct type for params
  const params = useParams<CourseParams>();
  const id = params.id;
  
  // State for managing current view
  const [currentView, setCurrentView] = useState<CourseViewType>(CourseViewType.Outline);
  
  // Fetch course data
  const { course, user, isLoading, error } = getCourse(id);
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-xl">Loading Course...</span>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 rounded-xl bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // Render not found state
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 rounded-xl bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Course Not Found</h2>
          <p className="text-gray-500 mb-4">The course you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
    
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 md:p-8">
      <div className="bg-white p-6 w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden">
        {/* Course Header */}
        <CourseHeader title={course.course_name} />
        
        {/* Course Description */}
        <CourseDescription description={course.description} />
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 px-6 pt-4 pb-0">
          <div className="-mb-px flex space-x-6">
            <div
              className="
                flex items-center space-x-2 pb-3 transition-colors text-blue-600 border-b-2 border-blue-600 font-semibold"
            >
              <BookOpen className="h-4 w-4" />
              <span>Course Outline</span>
            </div>
          </div>
        </div>
        
        {/* Dynamic Content Area */}
        <div className="p-6">
          {currentView === CourseViewType.Outline ? (
            <OutlineContainer course_id={course.course_id} />
          ) : (
            <div className="text-center text-gray-500 py-12">
              Resources section coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}