import React from 'react';

function QuestionBox() {
  return (
    <div className="w-full  flex justify-center cursor-pointer gap-2">
      <span>1</span>
      <div className="min-h-[6rem]  min-w-[10rem] border-2 border-gray-500 rounded flex justify-center items-center cursor-pointer hover:shadow-md"></div>
    </div>
  );
}

export default QuestionBox;
