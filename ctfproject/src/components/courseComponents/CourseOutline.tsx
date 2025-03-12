import React from "react";
import { Star } from "lucide-react";
const CourseOutline = () => {
  return (
    <div>
      {/* Course Outline & Resources */}
      <div className="mt-6 flex space-x-4 border-b pb-2">
        <button className="font-bold text-black">Course Outline</button>
        <button className="text-gray-500">Resources</button>
      </div>

      {/* Course Task */}
      <div className="mt-4 bg-white p-4 rounded-3xl shadow flex justify-between items-center">
        <p className="text-gray-600">name problem</p>
        <div className="flex gap-5">
          <p className="text-gray-500">time remain : xxxxx</p>
          <div className="flex space-x-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gray-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOutline;
