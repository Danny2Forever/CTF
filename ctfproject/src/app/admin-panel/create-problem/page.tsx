import React from 'react'
import CreateProblemForm from '@/components/admin/problem/CreateProblemForm'
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar'

const CreateProblemPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-8">
            <h1 className="text-3xl text-primary font-bold text-center mb-8">Create Problem</h1>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="w-full bg-gray-200 p-6 rounded-4xl">
                    <CreateProblemForm />
                </div>
            </div>
        </div>
  )
}

export default CreateProblemPage