import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

function QuestionAddBox() {
  return (
    <div className="min-h-[6rem]  min-w-[10rem] border-2 border-gray-500 rounded flex justify-center items-center cursor-pointer hover:shadow-md">
      <IoIosAddCircleOutline className="text-4xl" />
    </div>
  );
}

export default QuestionAddBox;
