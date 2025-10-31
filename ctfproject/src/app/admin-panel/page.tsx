"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import AdminAllCourse from "@/components/admin/course/AdminAllCourse";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AdminPanelPage = () => {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        window.location.href = "/login";
      } else if (!isAdmin) {
        router.replace("/");
      }
    }
  }, [isLoggedIn, isAdmin, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn || !isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
      <div className="flex gap-6">
        <AdminSidebar />
        <div className="md:w-3/4 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-end mb-6">
            <Button
              onClick={() => router.push("/admin-panel/create-course")}
              variant="outline"
              className="flex items-center gap-2 rounded-full px-6 py-3"
            >
              <PlusCircle className="h-5 w-5" />
              Create New Course
            </Button>
          </div>
          <AdminAllCourse />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
