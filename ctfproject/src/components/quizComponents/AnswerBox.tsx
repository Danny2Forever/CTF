"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type QuizParams = {
  quiz_id: string;
  id: string;
};

type CurrentProblem = {
  pro_id: number;
  pro_description: string;
  pro_name: string;
};

const AnswerBox: React.FC<{ onSend: (answer: string) => void }> = ({ onSend }) => {
  const [answer, setAnswer] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSendClick = () => {
    onSend(answer);
    setAnswer("");
  };

  return (
    <div className="w-1/2 mx-auto p-3 mt-4 bg-gray-500 text-white rounded-lg">
      <input
        type="text"
        value={answer}
        onChange={handleInputChange}
        className="w-full p-3 bg-transparent text-white rounded-lg focus:outline-none"
        placeholder="Type your answer here..."
      />
      <div className="flex justify-end mt-2">
        <Button onClick={handleSendClick} className="bg-blue-500 text-white rounded-3xl px-6 py-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default AnswerBox;
