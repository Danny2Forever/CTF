import React from "react"

import CreateCourseForm from "@/components/admin/course/CreateCourseForm"

import AdminSidebar from "@/components/admin/sidebar/AdminSidebar"

const CreateCoursePage = () => {
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <h1 className="text-3xl text-primary font-bold text-center mb-8">Create Course</h1>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="md:w-3/4 bg-gray-200 p-6 rounded-4xl">
                    <CreateCourseForm />
                </div>
            </div>
        </div>
    )
}

export default CreateCoursePage