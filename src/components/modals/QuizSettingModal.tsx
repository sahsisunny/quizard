import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdImage, MdSave } from 'react-icons/md';

import { useQuizData } from '@/provider/QuizDataProvider';

import Selector from '../reusable/Selector';
import ImageUploadModal from './ImageUploadModal';

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
  const [imgSrc, setImgSrc] = useState(quizData.coverImage || "");
  const [error, setErrorMessages] = useState("This field is required");
  const [showImageUploadModal, setImageUploadModal] = useState(false);

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
    setQuizData({ ...quizData, coverImage: imgSrc });
    onClose();
  };

  const onDoneClickHandler = () => {
    setImageUploadModal(false);
  };

  const onSelectorChangeHandler = (option: { key: string; value: string }) => {
    setQuizData({ ...quizData, subject: option.value });
  };

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-2">
        <div className="md:w-1/2 w-full flex flex-col border gap-2">
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={quizData.title || "Untitled Quiz"}
            onClick={handleSelectAll}
            onChange={inputOnChangeHandler}
          />
          <p className="text-red-500 text-xs">{error}</p>
          <Selector
            options={questionSubject}
            name="Subject"
            onSelect={onSelectorChangeHandler}
            selectedOption={quizData.subject}
          />
          <Selector
            options={gradeLevel}
            name="Grade"
            onSelect={onSelectorChangeHandler}
            selectedOption={quizData.grade}
          />
          <Selector
            options={language}
            name="Language"
            onSelect={onSelectorChangeHandler}
            selectedOption={quizData.language}
          />
          <Selector
            options={visibility}
            name="Visibility"
            onSelect={onSelectorChangeHandler}
            selectedOption={quizData.visibility}
          />
        </div>
        <div className="relative md:w-1/2 w-full flex flex-col justify-center items-center gap-2 border-2">
          {imgSrc && (
            <div className="absolute right-0 top-0 flex flex-col gap-2 text-white">
              <button
                className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-green-600 border-none hover:bg-green-700"
                onClick={() => setImageUploadModal(true)}
              >
                <MdImage className="text-xl" />
              </button>

              <button
                className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-red-600 border-none hover:bg-red-700"
                onClick={() => setImgSrc("")}
              >
                <AiOutlineDelete className="text-xl" />
              </button>
            </div>
          )}
          {imgSrc ? (
            <div className="relative flex flex-col gap-2 h-[35vh]">
              <Image
                src={imgSrc}
                alt="quiz cover"
                width={100}
                height={100}
                className="w-auto h-full object-cover shadow-lg "
              />
            </div>
          ) : (
            <div
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
              onClick={() => setImageUploadModal(true)}
            >
              <MdImage className="text-8xl" />
              <span className="text-sm">Add Cover Image</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="py-2 px-3 bg-purple-500 text-white rounded-md flex gap-2 items-center mt-2"
          onClick={saveClickHandler}
        >
          <MdSave className="text-xl" />
          Save
        </button>
      </div>
      {showImageUploadModal && (
        <ImageUploadModal
          onClose={() => setImageUploadModal(false)}
          SetImage={setImgSrc}
          deleteOnClick={() => setImgSrc("")}
          doneOnClick={onDoneClickHandler}
        />
      )}
    </>
  );
}

export default QuizSettingModal;
