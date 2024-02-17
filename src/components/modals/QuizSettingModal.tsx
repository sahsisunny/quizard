import React, { useState } from 'react';
import { CiImageOn } from 'react-icons/ci';

import { useQuizData } from '@/provider/QuizDataProvider';

import Selector from '../reusable/Selector';

interface QuizSettingModalProps {
  questionSubject: { [key: string]: string };
  gradeLevel: { [key: string]: string };
  language: { [key: string]: string };
  visibility: { [key: string]: string };
  onClose: () => void;
}

function QuizSettingModal({
  questionSubject,
  gradeLevel,
  language,
  visibility,
  onClose,
}: QuizSettingModalProps) {
  const { quizData, setQuizData } = useQuizData();
  const [error, setErrorMessages] = useState("This field is required");
  const handleSelectAll = (e: any) => {
    e.target.select();
  };

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 5) {
      setErrorMessages("Title must be more than 5 characters");
    } else {
      setErrorMessages("");
    }

    setQuizData({ ...quizData, title: value });
  };

  const saveClickHandler = () => {
    if (quizData.title.length < 5) {
      setErrorMessages("Title must be more than 5 characters");
    } else {
      setErrorMessages("");
    }
    console.log({ quizData });
    onClose();
  };
  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-4">
        <div className="md:w-1/2 w-full flex flex-col border gap-2">
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={quizData.title}
            onClick={handleSelectAll}
            onChange={inputOnChangeHandler}
          />
          <p className="text-red-500 text-xs">{error}</p>
          <Selector options={questionSubject} name="Subject" />
          <Selector options={gradeLevel} name="Grade" />
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
          onClick={saveClickHandler}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default QuizSettingModal;
