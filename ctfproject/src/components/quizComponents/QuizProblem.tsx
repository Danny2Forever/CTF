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
    <div className="flex-1 bg-[#323232] p-8 rounded-3xl shadow-lg flex flex-col h-full relative">
      <div className="text-white text-lg font-semibold pb-4 flex justify-center items-center">
        {problem?.pro_name || "Problem"}
      </div>
      <div
        className="bg-[rgb(217,217,217)] flex-1 p-6 rounded-3xl shadow-lg overflow-y-auto"
        style={{ maxHeight: "calc(100% - 120px)" }}
      >
        <div className="space-y-4">
          {problem ? (
            <div className="text-gray-800">{problem.pro_description}</div>
          ) : (
            <p className="text-gray-800">Problem details not available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
