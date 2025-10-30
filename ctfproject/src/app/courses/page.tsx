"use client";

import React, { useEffect, useState } from "react";
import { Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import { courses } from "@/lib/server/database/schema";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  courseName: string;
  courseDescription: string;
  createdAt: string;
}

export default function AllCoursesPage() {
  const { isLoggedIn } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to load courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-xl">Loading courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h1>

      <div className="grid gap-6 w-full max-w-5xl md:grid-cols-2 lg:grid-cols-3 px-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="text-blue-600 h-6 w-6" />
              <h2 className="text-lg font-semibold text-gray-800">{course.courseName}</h2>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3">
              {course.courseDescription}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
