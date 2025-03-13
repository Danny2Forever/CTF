"use client";
import React, { useState } from "react";
import QuizProblem from "@/components/quizComponents/QuizProblem";
import QuizRequire from "@/components/quizComponents/QuizRequire";
import { Button } from "@/components/ui/button";
import AnswerPopUp from "@/components/quizComponents/AnswerPopUp";

const page = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  return (
    <>
      <div className="min-screen p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 justify-center">

          <div className="h-[78vh] lg:w-2/3 w-full pb-3">
            <QuizProblem />
          </div>
          
          <div className="lg:w-1/3 w-full flex flex-col space-y-4 justify-center items-center">
            <QuizRequire />
            <div className="flex justify-center items-center gap-7">
              <Button
                onClick={handleButtonClick}
                className="w-56 h-11 rounded-4xl"
              >
                Answer
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className=" w-3/4 p-6 bg-[#111] rounded-2xl shadow-lg text-white"></div>
      </div>
      <AnswerPopUp isVisible={isPopupVisible} onClose={handleClosePopup} />
    </>
  );
};

export default page;
