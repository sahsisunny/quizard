import React, { useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiImageOn } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import { IoMdSave } from 'react-icons/io';

import TextEditor from './reusable/TextEditor';

interface AddExplanationProps {
  backToQuestion: () => void;
  saveExplanation: () => void;
  deleteExplanation: () => void;
}

function AddExplanation({
  backToQuestion,
  saveExplanation,
  deleteExplanation,
}: AddExplanationProps) {
  const [imgSrc, setImgSrc] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || ""),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="p-2 min-h-[74vh]">
      <div className="flex flex-col gap-4 p-2 rounded bg-gray-900 text-white h-full">
        <div className="flex justify-between items-center gap-4">
          <button
            className="flex gap-2 items-center px-2 py-2 border rounded bg-gray-600 border-none hover:bg-gray-700"
            onClick={backToQuestion}
          >
            <FaArrowLeft className="text-xl" />
            <span className="hidden sm:block text-sm">
              Back to the question
            </span>
          </button>
          <div className="flex gap-2">
            <button
              className="flex gap-2 items-center px-2 py-2 border rounded bg-purple-600 border-none hover:bg-purple-700"
              onClick={saveExplanation}
            >
              <IoMdSave className="text-xl" />
              <span className="hidden sm:block text-sm">
                Save answer explanation
              </span>
            </button>
            <button
              className="flex gap-2 items-center px-2 py-2 border rounded bg-red-600 border-none hover:bg-red-700"
              onClick={deleteExplanation}
            >
              <AiOutlineDelete className="text-xl" />
              <span className="hidden sm:block text-sm">Delete</span>
            </button>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-2 w-full  rounded min-h-[56vh]">
          <div className="lg:w-1/4 w-full flex flex-col justify-center items-center gap-2 border-2 border-dashed rounded p-5">
            {imgSrc ? (
              <div className="flex flex-col gap-2 h-full">
                <div className="flex gap-2 relative top-0">
                  <button
                    className="flex gap-2 items-center justify-center w-1/2 px-2 py-2 border rounded bg-green-600 border-none hover:bg-red-700"
                    onClick={onClickUpload}
                  >
                    <CiImageOn className="text-xl" />
                    <span className="hidden sm:block text-sm">Change</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onSelectFile}
                    />
                  </button>
                  <button
                    className="flex gap-2 items-center justify-center w-1/2 px-2 py-2 border rounded bg-red-600 border-none hover:bg-red-700"
                    onClick={() => setImgSrc("")}
                  >
                    <AiOutlineDelete className="text-xl" />
                    <span className="hidden sm:block text-sm">Remove</span>
                  </button>
                </div>

                <img
                  src={imgSrc}
                  alt="quiz cover"
                  className="rounded-md w-auto h-auto object-cover bg-gray-900 border-2 border-gray-900"
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
                <CiImageOn className="text-8xl" />
                <span className="text-sm">Add Cover Image</span>
              </div>
            )}
          </div>
          <div className="lg:w-3/4 w-full rounded border-2 border-dashed">
            <TextEditor
              placeholder="Add an explanation to your answer"
              editorStyles="h-full p-4 w-auto focus:bg-gray-800 bg-gray-900"
              toolbarStyles=" rounded-lg p-4 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExplanation;
