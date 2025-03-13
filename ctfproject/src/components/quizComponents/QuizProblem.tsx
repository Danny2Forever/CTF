import React from "react";

// No props are expected in this component, so no need for custom prop types
const QuizProblem: React.FC = () => {
  return (
    <div className="flex-1 bg-[#323232] p-6 rounded-3xl shadow-lg flex flex-col h-full relative">
      <div className="text-white text-lg font-semibold pb-3 flex justify-center items-center">
        Problem
      </div>
      <div
        className="bg-[rgb(217,217,217)] flex-1 p-6 rounded-3xl shadow-lg overflow-y-auto"
        style={{ maxHeight: "calc(100% - 120px)" }}
      >
        <div className="space-y-4">
            asdadasd
        </div>
      </div>
    </div>
  );
};

export default QuizProblem;
