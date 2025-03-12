import React from "react";

const CourseCard = () => {
  return (
    <div>
      <div className="mt-6 space-y-6 w-full max-w-4xl">
        {[1, 2].map((course) => (
          <div
            key={course}
            className="bg-white p-4 rounded-4xl shadow flex items-center"
          >
            <div className="w-64 h-64 bg-gray-300 rounded-4xl"></div>
            <div className="ml-16 flex-1">
              <h2 className="text-4xl font-bold">Course Name</h2>
              <p className="text-gray-600">Instructor name</p>
              <p className="text-sm text-gray-500 mt-2">
                Lorem ipsum dolor sit amet consectetur. Tellus ultricies ut et
                phasellus a purus.
              </p>
            </div>
            <button className="bg-gray-300 px-4 py-2 rounded-lg">
              enroll course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;
