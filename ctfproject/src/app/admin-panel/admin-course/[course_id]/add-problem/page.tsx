"use client"

import React from 'react'
import AddProblemForm from '@/components/admin/problem/AddProblemForm'
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar'
import { useParams } from 'next/navigation'

const AddProblemPage = () => {
  const { course_id } = useParams<{ course_id: string }>()
  return (
    <div className="max-w-7xl mx-auto mt-8">
            <h1 className="text-3xl text-primary font-bold text-center mb-8">Add Problem</h1>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="w-1/2 bg-[#D9D9D9] p-6 rounded-4xl">
                    <AddProblemForm courseId={course_id}/>
                </div>
            </div>
        </div>
  )
}

export default AddProblemPage