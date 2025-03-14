"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Course } from "../../../types/course";

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
            
            const response = await fetch(`http://141.11.158.213:3000/api/courses/${course.course_id}/unenroll`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
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

    return (
        <div className="bg-white p-4 rounded-4xl flex items-center w-full mt-7">
            <div className="w-64 h-64 bg-gray-300 rounded-4xl overflow-hidden">
                {/* Add image or content here */}
            </div>

            <div className="ml-16 flex-1">
                <h2 className="text-4xl font-bold pr-6 break-words whitespace-normal line-clamp-2">
                    {course?.course_name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                </h2>
                <p className="text-sm text-gray-500 mt-2">{course.description}</p>
                
                {unenrollStatus === "success" && (
                    <p className="text-green-500 mt-2">Successfully unenrolled!</p>
                )}
                
                {unenrollStatus === "error" && (
                    <p className="text-red-500 mt-2">Failed to unenroll. Please try again.</p>
                )}
            </div>

            <div className="flex flex-col space-y-3">
                {/* Enter Course Button */}
                <Button
                    variant="outline"
                    onClick={handleNavigate}
                    className="bg-text-gray-600 rounded-3xl cursor-pointer"
                >
                    Enter Course
                </Button>
                
                {/* Unenroll Button */}
                <Button
                    variant="outline"
                    onClick={handleUnenroll}
                    disabled={isUnenrolling || unenrollStatus === "success"}
                    className="bg-white text-red-500 border-red-500 hover:bg-red-50 rounded-3xl cursor-pointer"
                >
                    {isUnenrolling ? "Unenrolling..." : unenrollStatus === "success" ? "Unenrolled" : "Unenroll"}
                </Button>
            </div>
        </div>
    );
};

export default EnrolledCourseCard;