"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Problem } from "../../../types/problem";

interface CourseOutlineProps {
  course_id: number | undefined;
  problem: Problem;
}

const CourseOutline: React.FC<CourseOutlineProps> = ({ course_id, problem }) => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/course/${course_id}/quiz/${problem.pro_id}`);
  };

  return (
    <div>
      <div className="mt-4 bg-white p-4 rounded-3xl shadow flex justify-between items-center">
        <p className="text-gray-600">Problem Name: {problem.pro_name}</p>
        <Button onClick={handleNavigate} variant="default" className=" cursor-pointer">
          Get Problem
        </Button>
      </div>
    </div>
  );
};

export default CourseOutline;
