import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

const HintPopUp = ({ isVisible, onClose }) => {
  // Function to handle click on the background to close the popup
  const handleBackgroundClick = (e: any) => {
    // Close the popup only when the background (overlay) is clicked, not the content
    if (e.target === e.currentTarget) {
      console.log("Clicked");
      onClose(); // Close the popup
    }
  };
  return (
    <>
      {isVisible && (
        <>
          <div
            className="z-50 fixed inset-0 flex items-center justify-center bg-black opacity-80"
        
          ></div>
          <div className="z-51 fixed inset-0 flex items-center justify-center text-white p-8 rounded-3xl w-full h-full "
          onClick={handleBackgroundClick}>
            <Card className="relative pt-2 pl-4 pr-4 bg-black border-black w-4/12">
              <div className="flex items-center justify-center mb-2 relative pt-2">
                <MoreHorizontal className="text-white w-20 h-20 absolute left-0 " />
                <CardTitle className="text-white text-center">Hint</CardTitle>
              </div>
              <Card className="-mt-4">
                <CardContent className="py-2">
                  Lorem ipsum dolor sit amet consectetur. Eu scelerisque nibh
                  ultrices quam sed ipsum eu. A malesuada duis iaculis enim
                  massa rutrum nisl orci. Nec dolor enim sit rhoncus
                  sollicitudin. Convallis morbi tristique nunc viverra morbi
                  pulvinar duis placerat.
                </CardContent>
              </Card>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default HintPopUp;
