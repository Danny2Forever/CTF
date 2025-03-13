import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

interface AnswerPopUpProps {
  isVisible: boolean;
  onClose: () => void;
}

const AnswerPopUp: React.FC<AnswerPopUpProps> = ({ isVisible, onClose }) => {

  const [answer, setAnswer] = useState<string>("");

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSendClick = () => {
    console.log("Sent Answer: ", answer);
    setAnswer("");
    onClose();
  };

  return (
    <>
      {isVisible && (
        <>
          <div
            className="z-50 fixed inset-0 flex items-center justify-center bg-black opacity-80"
          ></div>

          <div
            className="z-51 fixed inset-0 flex items-center justify-center text-white p-8 rounded-3xl w-full h-full"
            onClick={handleBackgroundClick}
          >
            <Card className="relative pt-2 pl-4 pr-4 bg-black border-black w-4/12">
              <div className="flex items-center justify-center mb-2 relative pt-2">
                <MoreHorizontal className="text-white w-20 h-20 absolute left-0" />
                <CardTitle className="text-white text-center">Answer</CardTitle>
              </div>
              <Card className="-mt-4">
                <CardContent className="py-2">
                  <div className="space-y-4">

                    <input
                      type="text"
                      value={answer}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-4 bg-[#333] text-white rounded-lg focus:outline-none"
                      placeholder="Type your answer here..."
                    />
                    
                    <div className="flex justify-end mt-4">
                      <Button onClick={handleSendClick} className="bg-blue-500 text-white rounded-3xl">
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default AnswerPopUp;
