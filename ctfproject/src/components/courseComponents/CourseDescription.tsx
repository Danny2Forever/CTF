import React from "react";

interface CourseDescriptionProps {
  description: string | undefined;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ description }) => {
  return (
    <div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Course Description</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default CourseDescription;
