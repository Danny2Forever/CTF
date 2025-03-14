import React from "react";
import AllCourseContainer from "@/components/courseComponents/AllCourseContainer";
import EnrolledCourseContainer from "@/components/courseComponents/EnrolledCourseContainer";

const Page = () => {
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
      <EnrolledCourseContainer />
      {/* <AllCourseContainer /> */}
    </div>
  );
};

export default Page;
