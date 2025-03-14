"use client"
import React, { useState } from "react";
import AllCourseContainer from "@/components/courseComponents/AllCourseContainer";
import EnrolledCourseContainer from "@/components/courseComponents/EnrolledCourseContainer";

const MyCourse = () => {
    const [activeView, setActiveView] = useState<"all" | "enrolled">("enrolled");
    
    return (
        <div className="min-h-screen flex flex-col items-center p-4 mt-10">
            <h1 className="text-5xl font-bold mb-7 text-blue-600">My Courses</h1>
            
            <div className="mt-4 flex gap-4 mb-10">
                <button 
                    onClick={() => setActiveView("enrolled")}
                    className={`px-4 py-2 rounded-2xl transition-colors cursor-pointer ${
                        activeView === "enrolled" 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    Enrolled Courses
                </button>
                
                <button 
                    onClick={() => setActiveView("all")}
                    className={`px-4 py-2 rounded-2xl transition-colors cursor-pointer ${
                        activeView === "all" 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    All Courses
                </button>
            </div>
            
            {activeView === "enrolled" ? <EnrolledCourseContainer /> : <AllCourseContainer />}
        </div>
    );
};

export default MyCourse;