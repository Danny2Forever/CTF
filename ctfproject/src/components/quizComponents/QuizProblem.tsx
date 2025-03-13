import React from "react";

const QuizProblem: React.FC = () => {
  return (
    <div className="flex-1 bg-[#323232] p-8 rounded-3xl shadow-lg flex flex-col h-full relative">
      <div className="text-white text-lg font-semibold pb-4 flex justify-center items-center">
        Problem
      </div>
      <div
        className="bg-[rgb(217,217,217)] flex-1 p-6 rounded-3xl shadow-lg overflow-y-auto"
        style={{ maxHeight: "calc(100% - 120px)" }}
      >
        <div className="space-y-4">
          {/* Add your actual problem content here */}
          <p className="text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizProblem;
