"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Course } from "../../../types/course";
import { 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  LogIn, 
  LogOut 
} from "lucide-react";

const EnrolledCourseCard = ({ course }: { course: Course }) => {
    const router = useRouter();
    const [isUnenrolling, setIsUnenrolling] = useState(false);
    const [unenrollStatus, setUnenrollStatus] = useState<"idle" | "success" | "error">("idle");

    const handleNavigate = () => {
        router.push(`/course/${course.course_id}`);
    };

    const handleUnenroll = async () => {
        try {
            setIsUnenrolling(true);
            setUnenrollStatus("idle");
            const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;
            
            const response = await fetch(`https://cyberctfproject.fewpz.xyz/api/courses/${course.course_id}/unenroll`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                }
            });

            if (!response.ok) {
                throw new Error('Failed to unenroll');
            }

            const data = await response.json();
            console.log('Unenrollment successful:', data);
            setUnenrollStatus("success");
            
            // Refresh the page after successful unenrollment
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Short delay to show the success message
            
        } catch (error) {
            console.error('Error unenrolling from course:', error);
            setUnenrollStatus("error");
        } finally {
            setIsUnenrolling(false);
        }
    };

    // Format course name to be more readable
    const formatCourseName = (name: string) => 
        name.replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase())
            .trim();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-8 mb-6"
        >
            {/* Course Image Placeholder */}
            <div className="w-full md:w-64 h-64 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary/50" />
            </div>

            {/* Course Details */}
            <div className="flex-1 w-full text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                    {formatCourseName(course?.course_name)}
                </h2>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {course.description}
                </p>

                {/* Unenrollment Status Messages */}
                {unenrollStatus === "success" && (
                    <div className="flex items-center text-green-600 mb-4">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        <span>Successfully unenrolled!</span>
                    </div>
                )}

                {unenrollStatus === "error" && (
                    <div className="flex items-center text-red-500 mb-4">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        <span>Failed to unenroll. Please try again.</span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    {/* Enter Course Button */}
                    <Button
                        onClick={handleNavigate}
                        className=" flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20"
                        variant="outline"
                    >
                        <LogIn className="mr-2 h-4 w-4" />
                        Enter Course
                    </Button>
                    
                    {/* Unenroll Button */}
                    <Button
                        onClick={handleUnenroll}
                        disabled={isUnenrolling || unenrollStatus === "success"}
                        className=" flex items-center justify-center gap-2 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                        variant="outline"
                    >
                        {isUnenrolling ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Unenrolling...
                            </>
                        ) : unenrollStatus === "success" ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Unenrolled
                            </>
                        ) : (
                            <>
                                <LogOut className="mr-2 h-4 w-4" />
                                Unenroll
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default EnrolledCourseCard;