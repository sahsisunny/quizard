import React from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

interface QuestionSettingsProps {
  title: string;
  onClickTitle: () => void;
  addExplanationHandler: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

function QuestionSettings({
  title,
  onClickTitle,
  addExplanationHandler,
}: QuestionSettingsProps) {
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div className="flex flex-row justify-between items-center p-2 h-14">
      <button
        className="max-w-96 h-10 border-none outline-none rounded-md p-2  text-lg font-semibold flex items-center gap-2"
        onClick={onClickTitle}
      >
        {title}
        <IoMdSettings />
      </button>
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Add Tag"
          className="w-20 p-2 text-sm border-2 rounded-md"
          onChange={inputOnChangeHandler}
        />
        <button
          className="bg-gray-800  gap-2 text-white rounded-md flex justify-center items-center px-3 py-2"
          onClick={addExplanationHandler}
        >
          <FaLightbulb />
          <span className="hidden xl:block text-sm">Add Explanation</span>
        </button>
      </div>
    </div>
  );
}

export default QuestionSettings;
