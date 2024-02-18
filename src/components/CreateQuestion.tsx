import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import { useActiveQuestion, useQuizData } from '@/provider/QuizDataProvider';

import TextEditor from './reusable/TextEditor';

function CreateQuestion() {
  const { activeQuestion } = useActiveQuestion();
  const { quizData, setQuizData } = useQuizData();
  const activeQuestionData = quizData.questions[activeQuestion];

  const [editors, setEditors] = useState([{ id: 1 }, { id: 2 }]);

  useEffect(() => {
    if (activeQuestionData) {
      const newEditors = activeQuestionData?.options.map((_, index) => ({
        id: index,
      }));
      setEditors(newEditors.length > 0 ? newEditors : [{ id: 1 }, { id: 2 }]);
    }
  }, [activeQuestionData]);

  if (!activeQuestionData) return null;
  const handleAddEditor = () => {
    if (editors.length < 5) {
      setEditors((prevEditors) => [
        ...prevEditors,
        { id: Date.now(), isAutoFocus: true },
      ]);
    }
  };

  const handleDeleteEditor = (id: number) => {
    if (editors.length > 2) {
      setEditors((prevEditors) =>
        prevEditors.filter((editor) => editor.id !== id),
      );
    }
  };

  const onQuestionChange = (question: string) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].question.text = question;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const onOptionChange = (option: string, index: number) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].options[index].text = option;
    setQuizData({ ...quizData, questions: updatedQuestions });
    console.log({ quizData });
  };

  const onCheckRadioHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.checked) {
      const optionValue = activeQuestionData.options[index];
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[activeQuestion].answer = [];
      updatedQuestions[activeQuestion].answer = [optionValue];
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const onCheckCheckboxHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const optionValue = activeQuestionData.options[index];
    if (e.target.checked) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[activeQuestion].answer.push(optionValue);
      setQuizData({ ...quizData, questions: updatedQuestions });
    } else {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[activeQuestion].answer = updatedQuestions[
        activeQuestion
      ].answer.filter((answer) => answer !== optionValue);
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  function questionImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    let imgString =
      e.target.files && e.target.files.length > 0
        ? URL.createObjectURL(e.target.files[0])
        : "";

    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].question.image = imgString;
    setQuizData({ ...quizData, questions: updatedQuestions });
  }

  const optionsImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let imgString =
      e.target.files && e.target.files.length > 0
        ? URL.createObjectURL(e.target.files[0])
        : "";

    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].options[index].image = imgString;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };
  return (
    <div className="flex flex-col items-center w-full p-2 min-h-[74vh]">
      <div className="flex flex-col w-full h-full gap-2 bg-red-900 p-2 rounded">
        <div className="flex lg:flex-row flex-col gap-2 h-1/2">
          {activeQuestionData.question.image && (
            <div className="flex items-center justify-center lg:w-auto w-full h-full">
              <Image
                src={activeQuestionData.question.image}
                alt="quiz cover"
                width={300}
                height={300}
                className="rounded-md lg:w-[400px] w-full h-full  object-cover bg-red-900 border-2 border-red-900"
              />
            </div>
          )}
          <div className="w-full h-full">
            <TextEditor
              toolbarStyles="bg-red-900 border h-auto"
              editorStyles="focus:bg-red-800 bg-red-900 "
              placeholder="Type question here"
              onChange={(e) => onQuestionChange(e.target.value)}
              value={activeQuestionData.question.text || ""}
              isAutoFocus={true}
              imageButtonHandler={(e: any) => questionImageSelect(e)}
            />
          </div>
        </div>
        {/* Options */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 w-full">
          {editors.map((editor, index) => (
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
              type={
                activeQuestionData.type === "SINGLE" ? "SINGLE" : "MULTIPLE"
              }
              onCheckRadio={(e) => onCheckRadioHandler(e, index)}
              placeholder={`Type option ${index + 1} here`}
              onChange={(e) => onOptionChange(e.target.value, index)}
              value={activeQuestionData.options[index]?.text || ""}
              radioChecked={activeQuestionData.answer.includes(
                activeQuestionData.options[index],
              )}
              checkboxChecked={activeQuestionData.answer.includes(
                activeQuestionData.options[index],
              )}
              onCheckCheckbox={(e) => onCheckCheckboxHandler(e, index)}
              isDisabled={!activeQuestionData.options[index]}
              imageButtonHandler={(e: any) => optionsImageUpload(e, index)}
            />
          ))}
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
  );
}

export default CreateQuestion;
