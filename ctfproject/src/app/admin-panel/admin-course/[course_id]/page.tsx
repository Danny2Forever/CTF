"use client"

import React from 'react'
import { useParams } from 'next/navigation'

import AdminSidebar from '@/components/admin/sidebar/AdminSidebar'
import AdminCourseDetail from '@/components/admin/course/AdminCourseDetail'
import CourseAllProblem from '@/components/admin/problem/CourseAllProblem'
import AdminAddProblemButton from '@/components/admin/buttons/AdminAddProblem'

const page = () => {
    const params = useParams<{ course_id: string }>
    const { course_id } = params();
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <h1 className="text-3xl text-center mb-8">admin panel</h1>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="w-full bg-[#D9D9D9] p-6 rounded-4xl">
                    <AdminCourseDetail courseId={course_id} />
                    <div className='mx-4'>
                        <div className='flex mb-4 gap-4'>
                            <AdminAddProblemButton courseId={course_id} />
                        </div>
                        <CourseAllProblem courseId={course_id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page