
import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

interface QuestionTitleProps {
  title: string;
  onClickTitle: () => void;
}

function QuestionTitle({ title, onClickTitle }: QuestionTitleProps) {

    const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        }
  return (
    <div className="flex flex-row justify-between items-center p-2 h-14">
      <button
        className="max-w-96 h-10 border-none outline-none rounded-md p-2  text-lg font-semibold"
        onClick={onClickTitle}
        >
        {title}
        </button>
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Add Tag"
          className="w-20 p-2 text-sm border-2 rounded-md"
            onChange={inputOnChangeHandler}
        />
        <button className="bg-gray-800  gap-2 text-white rounded-md flex justify-center items-center px-3 py-2">
          <FaLightbulb />
          <span className="hidden xl:block text-sm">Add Explanation</span>
        </button>
      </div>
    </div>
  );
}

export default QuestionTitle;
