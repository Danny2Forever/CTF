import React from "react"

import CreateCourseForm from "@/components/admin/course/CreateCourseForm"

import AdminSidebar from "@/components/admin/sidebar/AdminSidebar"

const CreateCoursePage = () => {
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <h1 className="text-3xl text-center mb-8">admin panel</h1>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="w-3/4 bg-[#D9D9D9] p-6 rounded-4xl">
                    <CreateCourseForm />
                </div>
            </div>
        </div>
    )
}

export default CreateCoursePage