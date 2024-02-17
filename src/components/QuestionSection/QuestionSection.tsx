"use client";
import Image from 'next/image';
import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import ModelComponent from '@/components/ModelComponent';

import TextEditor from '../TextEditor';
import QuestionSelectors from './QuestionSelectors';
import QuestionSettingModal from './QuestionSettingModal';
import QuestionTitle from './QuestionTitle';

function QuestionSection() {
  const [showModel, setShowModel] = useState(false);
  const [title, setTitle] = useState("Untitled quiz");
  const [editors, setEditors] = useState([{ id: 1 }, { id: 2 }]);

  const handleAddEditor = () => {
    if (editors.length < 5) {
      setEditors((prevEditors) => [...prevEditors, { id: Date.now() }]);
    }
  };

  const handleDeleteEditor = (id: number) => {
    if (editors.length > 2) {
      setEditors((prevEditors) =>
        prevEditors.filter((editor) => editor.id !== id),
      );
    }
  };

  return (
    <div className="w-full">
      <QuestionTitle title={title} onClickTitle={() => setShowModel(true)} />

      <QuestionSelectors />
      <div className="flex flex-col items-center w-full p-2">
        <div className="flex flex-col w-full gap-2 bg-red-900 p-2 rounded">
          <div className="flex flex-row gap-2 h-1/2">
            <div className="w-auto h-auto">
              <Image
                src="/computer.png"
                alt="quiz cover"
                width={250}
                height={250}
                className="rounded-md w-auto h-auto object-cover bg-red-900 border-2 border-red-900"
              />
            </div>
            <div className="w-full h-full">
              <TextEditor
                toolbarStyles="bg-red-900 border h-auto"
                editorStyles="focus:bg-red-800 bg-red-900 "
                placeholder="Type question here"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 w-full">
            {editors.map(
              (editor, index) => (
                console.log("editor:", index), // Log editor prop
                (
                  <TextEditor
                    key={editor.id}
                    deleteButtonHandler={() => handleDeleteEditor(editor.id)}
                    isDeleteButton={editors.length > 2}
                    toolbarStyles={
                      index === 0
                        ? "bg-green-900"
                        : index === 1
                          ? "bg-blue-900"
                          : index === 2
                            ? "bg-fuchsia-900"
                            : index === 3
                              ? "bg-purple-900"
                              : "bg-yellow-900"
                    }
                    editorStyles={
                      index === 0
                        ? "focus:bg-green-800 bg-green-900"
                        : index === 1
                          ? "focus:bg-blue-800 bg-blue-900"
                          : index === 2
                            ? "focus:bg-fuchsia-800 bg-fuchsia-900"
                            : index === 3
                              ? "focus:bg-purple-800 bg-purple-900"
                              : "focus:bg-yellow-800 bg-yellow-900"
                    }
                    type="MULTIPLE"
                    placeholder={`Type option ${index + 1} here`}
                  />
                )
              ),
            )}
            {editors.length < 5 && (
              <div
                className="flex items-center justify-center rounded-md p-2 cursor-pointer h-full border"
                onClick={handleAddEditor}
              >
                <IoIosAdd className="text-4xl" />
              </div>
            )}
          </div>
        </div>
      </div>
      {showModel && (
        <ModelComponent
          title="Edit Quiz Cover"
          subtitle="Review your quiz before publishing"
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
