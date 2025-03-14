import React from "react";

type ProblemProps = {
  problem?: {
    pro_id: number;
    pro_description: string;
    pro_name: string;
  };
};

export default function QuizProblem({ problem }: ProblemProps) {
  return (
    <div className="flex-1 bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col h-full relative overflow-hidden">
      {/* Problem Header */}
      <div className="mb-4 pb-2 border-b border-gray-700">
        <h2 className="text-xl md:text-2xl font-bold text-white text-center tracking-wide">
          {problem?.pro_name || "Problem"}
        </h2>
      </div>

      {/* Problem Content Area */}
      <div 
        className="bg-gray-100 flex-1 p-4 md:p-6 rounded-xl shadow-inner overflow-y-auto"
        style={{ 
          maxHeight: "calc(100% - 80px)",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,0.2) transparent"
        }}
      >
        {problem ? (
          <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
            {problem.pro_description}
          </div>
        ) : (
          <div className="text-gray-500 italic text-center py-4">
            Problem details are not available at the moment.
          </div>
        )}
      </div>

      {/* Optional: Problem ID Badge */}
      {problem?.pro_id && (
        <div className="absolute top-4 right-4 bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs">
          Problem #{problem.pro_id}
        </div>
      )}
    </div>
  );
}