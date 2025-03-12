"use client"
// admin-panel/page.tsx:

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminAllCourse from '@/components/admin/course/AdminAllCourse';


const AdminPanelPage = () => {
    const router = useRouter();
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <h1 className="text-3xl text-center mb-8">admin panel</h1>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div className="w-full bg-[#D9D9D9] p-6 rounded-4xl">
                    <div className="flex justify-end mb-4">
                        <Button onClick={() => router.push("admin-panel/create-course")} variant="outline" className="bg-white rounded-full px-8 cursor-pointer">
                            create new course
                        </Button>
                    </div>

                    <AdminAllCourse />
                </div>
            </div>
        </div>
    )
}

export default AdminPanelPage