import React from 'react';
import { CiImageOn } from 'react-icons/ci';

import { gradeLevel, language, questionSubject, visibility } from '@/data/selectors';

import Selector from '../Selector';

interface QuestionSettingModalProps {
  title: string;
  inputOnChange: (e: any) => void;
  saveOnClick: () => void;
}

function QuestionSettingModal({
  title,
  inputOnChange,
  saveOnClick,
}: QuestionSettingModalProps) {
  const handleSelectAll = (e: any) => {
    e.target.select();
  };

  return (
    <>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-1/2 w-full flex flex-col border gap-2">
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={title}
            onChange={inputOnChange}
            onClick={handleSelectAll}
          />
          <Selector options={questionSubject} name="Subject" />
          <Selector options={gradeLevel} name="Grade Level" />
          <Selector options={language} name="Language" />
          <Selector options={visibility} name="Visibility" />
        </div>
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center gap-2 border-2">
          <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
            <CiImageOn className="text-8xl" />
            <span className="text-sm">Add Cover Image</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="py-2 px-3 mt-4 bg-purple-500 text-white rounded-md"
          onClick={saveOnClick}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default QuestionSettingModal;
