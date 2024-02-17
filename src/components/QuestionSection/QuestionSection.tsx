"use client";
import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import ModelComponent from '@/components/ModelComponent';

import TextEditor from './QuestionArea/TextEditor';
import QuestionSelectors from './QuestionSelectors';
import QuestionSettingModal from './QuestionSettingModal';
import QuestionTitle from './QuestionTitle';

function QuestionSection() {
  const [showModel, setShowModel] = useState(false);
  const [title, setTitle] = useState("Untitled quiz");

  return (
    <div className="w-full">
      <QuestionTitle title={title} onClickTitle={() => setShowModel(true)} />

      <QuestionSelectors />
      <div className="flex flex-col items-center w-full h-[76%]">
        <div className="flex flex-col  gap-2 w-[80%] bg-red-900 p-2 rounded h-full">
          <TextEditor
            backgroundColor="bg-red-900 border"
            textAreaBackgroundColor="focus:bg-red-800 bg-red-900 "
            placeholder="Type your question here"
            height="h-1/2"

          />
          <div className="flex flex-col lg:flex-row items-center gap-2 h-1/2">
            <TextEditor
              backgroundColor="bg-green-900"
              textAreaBackgroundColor="focus:bg-green-800 bg-green-900"
              type="MULTIPLE"
              placeholder="Type your option here"
            height="h-full"
            />
            <TextEditor
              backgroundColor="bg-blue-900"
              textAreaBackgroundColor="focus:bg-blue-800 bg-blue-900"
              type="SINGLE"
              placeholder="Type your option here"
            height="h-full"

            />
            <TextEditor
              backgroundColor="bg-fuchsia-900"
              textAreaBackgroundColor="focus:bg-fuchsia-800 bg-fuchsia-900"
              type="MULTIPLE"
              placeholder="Type your option here"
            height="h-full"

            />
            <TextEditor
              backgroundColor="bg-purple-900"
              textAreaBackgroundColor="focus:bg-purple-800 bg-purple-900"
              type="SINGLE"
              placeholder="Type your option here"
            height="h-full"

            />
            <div className="flex items-center justify-center rounded-md p-2 cursor-pointer h-full border">
              <IoIosAdd className="text-4xl" />
            </div>
          </div>
        </div>
      </div>
      {showModel && (
        <ModelComponent
          title="Edit Quiz Cover"
          onClose={() => setShowModel(false)}
        >
          <QuestionSettingModal
            title={title}
            inputOnChange={(e) => setTitle(e.target.value)}
            saveOnClick={() => setShowModel(false)}
          />
        </ModelComponent>
      )}
    </div>
  );
}

export default QuestionSection;
