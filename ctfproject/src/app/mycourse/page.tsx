'use client'
import React, { useState } from "react";
import AllCourseContainer from "@/components/courseComponents/AllCourseContainer";
import EnrolledCourseContainer from "@/components/courseComponents/EnrolledCourseContainer";

const Page = () => {
  const [activeView, setActiveView] = useState<"enrolled" | "all">("enrolled");

  const handleViewChange = (view: "enrolled" | "all") => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-7">My Courses</h1>

      <div className="mt-4 space-x-4">
        <button
          onClick={() => handleViewChange("enrolled")}
          className={`font-bold ${activeView === "enrolled" ? "text-black" : "text-gray-500"}`}
        >
          Enrolled Courses
        </button>

        <button
          onClick={() => handleViewChange("all")}
          className={`font-bold ${activeView === "all" ? "text-black" : "text-gray-500"}`}
        >
          All Courses
        </button>
      </div>
      
      {activeView === "enrolled" ? (
        <EnrolledCourseContainer />
      ) : (
        <AllCourseContainer />
      )}
    </div>
  );
};

export default Page;
