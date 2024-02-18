import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdCrop, MdImage, MdSave } from 'react-icons/md';

import { useQuizData } from '@/provider/QuizDataProvider';

import Selector from '../reusable/Selector';
import ImageCropModal from './ImageCropModal';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImageCropModal, setShowImageCropModal] = useState(false);

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
    onClose();
  };

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    setQuizData({ ...quizData, coverImage: imgSrc });
  }

  const onClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubjectSelect = (option: { key: string; value: string }) => {
    setQuizData({ ...quizData, subject: option.value });
  };
  const onGradeSelect = (option: { key: string; value: string }) => {
    setQuizData({ ...quizData, grade: option.value });
  };
  const onLanguageSelect = (option: { key: string; value: string }) => {
    setQuizData({ ...quizData, language: option.value });
  };
  const onVisibilitySelect = (option: { key: string; value: string }) => {
    setQuizData({ ...quizData, visibility: option.value });
    console.log({ quizData });
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
            onSelect={onSubjectSelect}
            selectedOption={quizData.subject}
          />
          <Selector
            options={gradeLevel}
            name="Grade"
            onSelect={onGradeSelect}
            selectedOption={quizData.grade}
          />
          <Selector
            options={language}
            name="Language"
            onSelect={onLanguageSelect}
            selectedOption={quizData.language}
          />
          <Selector
            options={visibility}
            name="Visibility"
            onSelect={onVisibilitySelect}
            selectedOption={quizData.visibility}
          />
        </div>
        <div className="relative md:w-1/2 w-full flex flex-col justify-center items-center gap-2 border-2">
          {imgSrc && (
            <div className="absolute right-0 top-0 flex flex-col gap-2 text-white">
              <button
                className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-green-600 border-none hover:bg-green-700"
                onClick={onClickUpload}
              >
                <MdImage className="text-xl" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onSelectFile}
                />
              </button>
              <button
                className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-blue-600 border-none hover:bg-blue-700"
                onClick={() => setShowImageCropModal(true)}
              >
                <MdCrop className="text-xl" />
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
              onClick={onClickUpload}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onSelectFile}
              />
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
      {showImageCropModal && (
        <ImageCropModal imgSrc={imgSrc} onClose={onClose} />
      )}
    </>
  );
}

export default QuizSettingModal;
