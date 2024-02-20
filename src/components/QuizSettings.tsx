import React, { useEffect, useRef, useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdClose } from 'react-icons/md';

import { useQuizData } from '@/provider/QuizDataProvider';

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
  const { quizData, setQuizData } = useQuizData();
  const [newTag, setNewTag] = useState<string>("");
  const [showTags, setShowTags] = useState(false);
  const tagsRef = useRef<HTMLDivElement>(null);

  const tagsInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const addTag = () => {
    if (newTag.trim() !== "") {
      setQuizData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setQuizData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTag();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (tagsRef.current && !tagsRef.current.contains(e.target as Node)) {
      setShowTags(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between items-center p-2 h-[8vh]">
      <button
        className="max-w-96 h-8 border-none outline-none rounded p-2  text-lg font-semibold flex items-center gap-2"
        onClick={onClickTitle}
      >
        {title}
        <IoMdSettings />
      </button>
      <div className="flex flex-row gap-2 rounded">
        <div className="relative top-full left-0 bg-white border border-gray-300 rounded mt-1 w-40">
          <input
            type="text"
            placeholder={
              quizData.tags.length >= 10 ? "Max tags reached" : "Add Tags"
            }
            className="relative w-full p-2 text-sm  border"
            value={newTag}
            onChange={tagsInputChangeHandler}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowTags(true)}
            disabled={quizData.tags.length >= 10}
            maxLength={20}
          />
          {showTags && (
            <div
              className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded z-40 border-t-none"
              ref={tagsRef}
            >
              {quizData.tags.length > 0 && (
                <div className="flex flex-col gap-1 p-2">
                  {quizData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex justify-between items-center  p-1 rounded hover:bg-gray-100 transition-all duration-300 ease-in-out"
                    >
                      <span className="truncate">{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-red-600 focus:outline-none hover:text-red-800 transition-all duration-300 ease-in-out"
                      >
                        <MdClose />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="bg-gray-800 gap-2 text-white rounded-md flex justify-center items-center px-3 py-2"
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
