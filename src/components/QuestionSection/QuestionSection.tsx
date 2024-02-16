"use client";
import Reac, { useState } from 'react';
import { CiImageOn } from 'react-icons/ci';

import ModelComponent from '@/components/ModelComponent';

import TextEditor from './QuestionArea/TextEditor';
import QuestionSelectors from './QuestionSelectors';
import QuestionTitle from './QuestionTitle';
import Selector from './Selector';

function QuestionSection() {
  const [showModel, setShowModel] = useState(false);
  const [title, setTitle] = useState("Untitled quiz");
  const questionSubject = {
    Math: "math",
    Science: "science",
    English: "english",
    History: "history",
    Geography: "geography",
    Art: "art",
    Music: "music",
    "Computer Science": "computer",
  };

  const gradeLevel = {
    "Grade A": "gradeA",
    "Grade B": "gradeB",
    "Grade C": "gradeC",
    "Grade D": "gradeD",
    "Grade E": "gradeE",
  };

  const language = {
    English: "english",
    Spanish: "spanish",
    Hindi: "hindi",
    Urdu: "urdu",
  };

  const visibility = {
    Public: "public",
    Private: "private",
  };

  // onclick text select all text
  const handleSelectAll = (e: any) => {
    e.target.select();
  }

  return (
    <div className="w-full">
      <QuestionTitle title={title} onClickTitle={() => setShowModel(true)} />

      <QuestionSelectors />
      <TextEditor />
      {showModel && (
        <ModelComponent
          title="Edit Quiz Cover"
          onClose={() => setShowModel(false)}
        >
          <div className="flex md:flex-row flex-col gap-4">
            <div className="md:w-1/2 w-full flex flex-col border gap-2">
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              onClick={() => setShowModel(false)}
            >
              Save
            </button>
          </div>
        </ModelComponent>
      )}
    </div>
  );
}

export default QuestionSection;
