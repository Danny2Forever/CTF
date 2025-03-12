import React from "react";

const CourseHeader = () => {
  return (
    <div>
      <div className="flex items-start">
        <div className="w-44 h-44 bg-white rounded-3xl"></div>
        <div className="ml-4 flex-1">
          <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md">
            Cybersecurity
          </span>
          <h1 className="text-3xl font-bold mt-2">Course Name</h1>
          <p className="text-gray-600">Instructor name</p>
          <div className="flex gap-6 mt-6">
            <div className="w-10 h-10 bg-white rounded-2xl"></div>
            <div className="w-10 h-10 bg-white rounded-2xl"></div>
            <div className="w-10 h-10 bg-white rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
