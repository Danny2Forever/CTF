"use client";
import React, { useState } from "react";
import { File, Lightbulb } from "lucide-react";
import HintPopUp from "./HintPopUp"; // Import the popup component

const QuizProblem = () => {
  const [selectedDot, setSelectedDot] = useState(0); // State for selected dot
  const [isHintVisible, setIsHintVisible] = useState(false); // State for popup visibility

  const numberOfQuizzes = 5; // Number of quizzes

  const handleDotClick = (index: number) => {
    setSelectedDot(index); // Update the selected dot when clicked
  };

  const handleLightbulbClick = () => {
    setIsHintVisible(true); // Show the popup when the lightbulb is clicked
  };

  const handleClosePopup = () => {
    setIsHintVisible(false); // Close the popup
  };

  return (
    <div className="flex-1 bg-[#323232] p-6 rounded-3xl shadow-lg flex flex-col h-full relative">
      <div className="text-white text-lg font-semibold pb-3 flex justify-center items-center">
        Problem
      </div>
       {/* Scrollable content section */}
       <div
        className="bg-[rgb(217,217,217)] flex-1 p-6 rounded-3xl shadow-lg overflow-y-auto"
        style={{ maxHeight: "calc(100% - 120px)" }} // Ensures this section is scrollable
      >
        {/* You can place your quiz content here */}
        <div className="space-y-4">
          
        </div>
      </div>

      <div className="bg-[#A0A0A0] w-3/4 h-16 p-4 rounded-2xl absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between items-center">
        <div className="flex justify-center items-center space-x-9 w-full">
          {/* File Icon */}
          <a href="/information" className="text-white flex flex-col items-center justify-start">
            <File color="#ffffff" className="w-8 h-8" />
            <span>Info</span>
          </a>
          {/* Dots for quiz number */}
          <div className="flex justify-center items-center gap-x-3">
            {Array.from({ length: numberOfQuizzes }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleDotClick(index)} // Set selected dot on click
                className={`w-3 h-3 flex justify-center items-center rounded-full cursor-pointer transition-all duration-200 ${
                  selectedDot === index ? "bg-white w-8 h-8" : "bg-white"
                }`}
              ></div>
            ))}
          </div>

          {/* Lightbulb Icon */}
          <div className="text-white flex flex-col items-center justify-start cursor-pointer" onClick={handleLightbulbClick}>
            <Lightbulb color="#ffffff" className="w-8 h-8" />
            <span>Hint</span>
          </div>
        </div>
      </div>

      {/* Pass the visibility state and close function to the AnswerPopUp */}
      <HintPopUp isVisible={isHintVisible} onClose={handleClosePopup} />
    </div>
  );
};

export default QuizProblem;
