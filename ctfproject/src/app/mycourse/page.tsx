import React from "react";
import CourseCard from "@/components/courseComponents/CourseCard";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-7">my course</h1>
      <div className="mt-4 space-x-4">
        <button className={`font-bold 'text-black' : 'text-gray-500'}`}>
          enrolled course
        </button>
        <button className={`font-bold 'text-black' : 'text-gray-500'}`}>
          all course
        </button>
      </div>
      <CourseCard></CourseCard>
    </div>
  );
};

export default page;
