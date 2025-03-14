"use client"

import React, { Suspense } from 'react'
import { useParams } from 'next/navigation'
import { Shield, Book, PlusCircle } from 'lucide-react'

import AdminSidebar from '@/components/admin/sidebar/AdminSidebar'
import AdminCourseDetail from '@/components/admin/course/AdminCourseDetail'
import CourseAllProblem from '@/components/admin/problem/CourseAllProblem'
import AdminAddProblemButton from '@/components/admin/buttons/AdminAddProblem'

// Loading component for suspense
const PageSkeleton = () => (
  <div className="max-w-7xl mx-auto mt-8 animate-pulse">
    <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
    <div className="flex gap-6">
      <div className="w-1/4 bg-gray-100 rounded-lg h-screen"></div>
      <div className="w-3/4 bg-gray-50 p-6 rounded-lg">
        <div className="space-y-4">
          <div className="h-40 bg-gray-200 rounded-xl"></div>
          <div className="h-20 bg-gray-200 rounded-xl"></div>
          <div className="h-60 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
)

const AdminCoursePage = () => {
  // Safely extract course_id with type checking
  const params = useParams<{ course_id: string }>();
  const course_id = params.course_id;

  if (!course_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Course</h2>
          <p className="text-gray-600 mb-6">No course ID was provided. Please select a valid course.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="flex items-center justify-center mb-8">
        <Book className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold text-primary">Admin Course Management</h1>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-1/4">
          <AdminSidebar />
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            {/* Course Details Section */}
            <Suspense fallback={<div>Loading course details...</div>}>
              <AdminCourseDetail courseId={course_id} />
            </Suspense>
          </div>

          <div className="p-6">
            {/* Problem Management Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <PlusCircle className="h-6 w-6 mr-2 text-primary" />
                Course Problems
              </h2>
              <AdminAddProblemButton courseId={course_id} />
            </div>

            <Suspense fallback={<div>Loading problems...</div>}>
              <CourseAllProblem courseId={course_id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrap the page with Suspense for code splitting and lazy loading
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AdminCoursePage />
    </Suspense>
  )
}