"use client"
// admin-panel/page.tsx:

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

import AdminSidebar from '@/components/admin/sidebar/AdminSidebar';
import AdminAllCourse from '@/components/admin/course/AdminAllCourse';



const AdminPanelPage = () => {
    const router = useRouter();
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <h1 className="text-3xl text-primary font-bold text-center mb-8">Admin Panel</h1>

            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar />

                {/* Main Content Area */}
                <div 
                    className="md:w-3/4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
                >
                    <div className="flex justify-end mb-6">
                        <Button 
                            onClick={() => router.push("/admin-panel/create-course")} 
                            variant="outline" 
                            className="flex items-center gap-2 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 rounded-full px-6 py-3 transition-colors duration-300"
                        >
                            <PlusCircle className="h-5 w-5 text-primary" />
                            Create New Course
                        </Button>
                    </div>

                    <AdminAllCourse />
                </div>
            </div>
        </div>
    )
}

export default AdminPanelPage