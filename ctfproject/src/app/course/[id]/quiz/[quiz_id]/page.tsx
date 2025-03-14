"use client";
import React, { useState, useEffect } from "react";
import QuizProblem from "@/components/quizComponents/QuizProblem";
import QuizRequire from "@/components/quizComponents/QuizRequire";
import { Button } from "@/components/ui/button";
import AnswerPopUp from "@/components/quizComponents/AnswerPopUp";
import { useParams } from "next/navigation";
import { useProblemData } from "@/components/quizComponents/GetProblem";

type QuizParams = {
  quiz_id: string;
  id: string;
};

type CurrentProblem = {
  pro_id: number;
  pro_description: string;
  pro_name: string;
};

export default function QuizPage() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [problem, setProblem] = useState<CurrentProblem | undefined>(undefined);

  // Get URL parameters
  const params = useParams<QuizParams>();
  const quiz_id = params?.quiz_id;
  const course_id = params?.id;

  // Parse course_id to number if it exists
  const courseIdNumber = course_id ? parseInt(course_id) : undefined;

  // Use the custom hook to fetch problems
  const { problems, loading, error } = useProblemData(courseIdNumber);

  // Log for debugging
  useEffect(() => {
    console.log("Quiz ID:", quiz_id);
    console.log("Course ID:", course_id);
    console.log("Problems:", problems);
  }, [quiz_id, course_id, problems]);

  // Find the current problem based on quiz_id
  useEffect(() => {
    if (problems.length > 0 && quiz_id) {
      const currentProblem = problems.find(
        (p) => p.pro_id === parseInt(quiz_id)
      );
      setProblem(currentProblem);
      console.log("Current problem:", currentProblem);
    }
  }, [problems, quiz_id]);

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className="min-h-screen p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 justify-center gap-14">
          <div className="h-[78vh] w-full pb-3">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                Loading problem...
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full text-red-500">
                Error loading problem: {error.message}
              </div>
            ) : problem ? (
              <QuizProblem problem={problem} />
            ) : (
              <div className="flex justify-center items-center h-full">
                No problem found with ID: {quiz_id}
              </div>
            )}
          </div>

          <div className="lg:w-1/3 w-full flex flex-col space-y-4 justify-center items-center">
            <QuizRequire />
            <div className="flex justify-center items-center gap-7">
              <Button
                onClick={handleButtonClick}
                className="w-96 h-11 rounded-4xl"
                disabled={!problem}
              >
                Answer
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AnswerPopUp isVisible={isPopupVisible} onClose={handleClosePopup} />
    </>
  );
}
