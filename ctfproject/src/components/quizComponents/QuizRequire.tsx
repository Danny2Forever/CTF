import React from "react";

interface QuizRequireProps {
  host: string;
  port: number;
  sshuser: string;
  sshpass: string;
}

export default function QuizRequire(quizprop: QuizRequireProps){
  return (
    <div className="w-full p-6 bg-[#111] rounded-3xl shadow-lg text-white flex flex-col justify-between">
      <div>SSH Info</div>
      <div>Host: {quizprop.host}</div>
      <div>Port: {quizprop.port}</div>
      <div>sshuser: {quizprop.sshuser}</div>
      <div>sshpassword: {quizprop.sshpass}</div>
    </div>
  );
};