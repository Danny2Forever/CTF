"use client";

import React, { useState } from "react";
import QuizProblem from "@/components/quizComponents/QuizProblem";
import QuizRequire from "@/components/quizComponents/QuizRequire";
import QuizTerminal from "@/components/quizComponents/QuizTerminal";
import { Button } from "@/components/ui/button";
import AnswerPopUp from "@/components/quizComponents/AnswerPopUp";

const page = () => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  return (
    <>
      <div className="min-screen p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Side - 50% width on large screens */}
          <div className="h-[78vh] lg:w-1/2 w-full pb-3">
            <QuizProblem />
          </div>

          {/* Right Side - 50% width on large screens */}
          <div className="lg:w-1/2 w-full flex flex-col space-y-4">
            <QuizRequire />
            <QuizTerminal />
            <div className="flex justify-center items-center gap-7">
              <Button className="w-56 h-11 rounded-4xl">Download</Button>
              <Button
                onClick={() => setIsAnswerVisible(true)}
                className="w-56 h-11 rounded-4xl cursor-pointer"
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
      <AnswerPopUp isVisible={isAnswerVisible} onClose={() => setIsAnswerVisible(false)} />
    </> 
  );
};

export default page;
