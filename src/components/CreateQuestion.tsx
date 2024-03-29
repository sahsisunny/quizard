import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { MdImage, MdSave } from 'react-icons/md';

import { useActiveQuestion, useQuizData } from '@/provider/QuizDataProvider';

import ImageUploadModal from './modals/ImageUploadModal';
import TextEditor from './reusable/TextEditor';

function CreateQuestion() {
  const { activeQuestion } = useActiveQuestion();
  const { quizData, setQuizData } = useQuizData();
  const activeQuestionData = quizData.questions[activeQuestion];
  const [showQuestionImageUploadModal, setShowQuestionImageUploadModal] =
    useState(false);
  const [showOptionImageUploadModal, setShowOptionImageUploadModal] = useState(
    new Array(5).fill(false)
  );
  const [optionImages, setOptionImages] = useState(new Array(5).fill(""));
  const [questionImage, setQuestionImage] = useState("");
  const [editors, setEditors] = useState([{ id: 1 }, { id: 2 }]);

  useEffect(() => {
    if (activeQuestionData) {
      const newEditors = activeQuestionData?.options.map((_, index) => ({
        id: index,
      }));
      setEditors(newEditors.length > 0 ? newEditors : [{ id: 1 }, { id: 2 }]);
      if (activeQuestionData.question.image) {
        setQuestionImage(activeQuestionData.question.image);
      } else {
        setQuestionImage("");
      }

      if (activeQuestionData.options) {
        const newOptionImages = activeQuestionData.options.map(
          (option) => option.image
        );
        setOptionImages(newOptionImages);
      }
    }
  }, [activeQuestionData, quizData]);

  const setImageBasedOnOption = (index: number, image: string) => {
    setOptionImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = image;
      return newImages;
    });
  };

  if (!activeQuestionData) return null;
  const handleAddEditor = () => {
    if (editors.length < 5) {
      setEditors((prevEditors) => [...prevEditors, { id: Date.now() }]);
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[activeQuestion].options.push({ text: "", image: "" });
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const deleteEditorHandler = (index: number) => {
    if (editors.length > 2) {
      setEditors((prevEditors) =>
        prevEditors.filter((editor) => editor.id !== index)
      );
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[activeQuestion].options = updatedQuestions[
        activeQuestion
      ].options.filter((_, i) => i !== index);
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const onQuestionValueChange = (question: string) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].question.text = question;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const onOptionValueChange = (optionValue: string, index: number) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].options[index].text = optionValue;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const onCheckRadioClickHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.checked) {
      const optionValue = activeQuestionData.options[index];
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[activeQuestion].answer = [];
      updatedQuestions[activeQuestion].answer = [optionValue];
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const onCheckCheckboxClickHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
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

  const onQuestionImageSaveHandler = () => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].question.image = "";
    updatedQuestions[activeQuestion].question.image = questionImage;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const onDeleteQuestionImageHandler = () => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].question.image = "";
    setQuestionImage("");
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const onOptionImageSaveHandler = (index: number) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].options[index].image = "";
    updatedQuestions[activeQuestion].options[index].image = optionImages[index];
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const onDeleteOptionImageHandler = (index: number) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion].options[index].image = "";
    setOptionImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = "";
      return newImages;
    });
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  return (
    <div className="flex flex-col items-center w-full p-2 min-h-[74vh]">
      <div className="flex flex-col w-full h-full gap-2 bg-red-900 p-2 rounded">
        <div className="flex lg:flex-row flex-col gap-2 h-1/2">
          {questionImage && (
            <div className="relative flex items-center justify-center lg:w-auto w-full h-full ">
              <div className="absolute right-0 top-0 flex flex-col gap-2 text-white p-2">
                <button
                  className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-blue-600 border-none hover:bg-blue-700"
                  onClick={onQuestionImageSaveHandler}
                >
                  <MdSave className="text-xl" />
                </button>

                <button
                  className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-green-600 border-none hover:bg-green-700"
                  onClick={() => setShowQuestionImageUploadModal(true)}
                >
                  <MdImage className="text-xl" />
                </button>
                <button
                  className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-red-600 border-none hover:bg-red-700"
                  onClick={onDeleteQuestionImageHandler}
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
              </div>
              <Image
                src={questionImage}
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
              value={activeQuestionData.question.text || ""}
              isAutoFocus={true}
              onChange={(e) => onQuestionValueChange(e.target.value)}
              onImageClickHandler={() => setShowQuestionImageUploadModal(true)}
              isImageButton={questionImage ? false : true}
              imageDeleteHandler={onDeleteQuestionImageHandler}
            />
          </div>
        </div>
        {/* Options */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 w-full">
          {editors.map((editor, index) => (
            <div
              key={editor.id}
              className={`relative w-full h-full fex flex-row rounded p-2 ${
                index === 0
                  ? "bg-green-900"
                  : index === 1
                  ? "bg-blue-900"
                  : index === 2
                  ? "bg-fuchsia-900"
                  : index === 3
                  ? "bg-purple-900"
                  : "bg-yellow-900"
              }`}
            >
              <TextEditor
                key={editor.id}
                deleteButtonHandler={() => deleteEditorHandler(editor.id)}
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
                onCheckRadio={(e) => onCheckRadioClickHandler(e, index)}
                placeholder={`Type option ${index + 1} here`}
                onChange={(e) => onOptionValueChange(e.target.value, index)}
                value={activeQuestionData.options[index]?.text || ""}
                isRadioChecked={activeQuestionData.answer.some(
                  (answer) =>
                    answer.text === activeQuestionData.options[index]?.text
                )}
                isCheckboxChecked={activeQuestionData.answer.some(
                  (answer) =>
                    answer.text === activeQuestionData.options[index]?.text
                )}
                onCheckCheckbox={(e) => onCheckCheckboxClickHandler(e, index)}
                isDisabled={!activeQuestionData.options[index]}
                isImageButton={optionImages[index] ? false : true}
                onImageClickHandler={() => {
                  setShowOptionImageUploadModal((prev) => {
                    const newModals = [...prev];
                    newModals[index] = true;
                    return newModals;
                  });
                }}
              />
              {optionImages[index] && (
                <div className="relative flex items-center justify-center w-full h-fit ">
                  <div className="absolute right-0 top-0 flex flex-col gap-2 text-white p-2">
                    <button
                      className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-green-600 border-none hover:bg-green-700"
                      onClick={() => onOptionImageSaveHandler(index)}
                    >
                      <MdSave className="text-xl" />
                    </button>
                    <button
                      className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-blue-600 border-none hover:bg-blue-700"
                      onClick={() => {
                        setShowOptionImageUploadModal((prev) => {
                          const newModals = [...prev];
                          newModals[index] = true;
                          return newModals;
                        });
                      }}
                    >
                      <MdImage className="text-xl" />
                    </button>
                    <button
                      className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-blue-600 border-none hover:bg-blue-700"
                      onClick={() => onDeleteOptionImageHandler(index)}
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </div>
                  <Image
                    src={optionImages[index]}
                    alt="quiz cover"
                    width={300}
                    height={300}
                    className="rounded-md lg:w-[400px] w-full h-full  object-cover "
                  />
                </div>
              )}
              {showOptionImageUploadModal[index] && (
                <ImageUploadModal
                  onClose={() => {
                    setShowOptionImageUploadModal((prev) => {
                      const newModals = [...prev];
                      newModals[index] = false;
                      return newModals;
                    });
                  }}
                  SetImage={(image: string) => {
                    setImageBasedOnOption(index, image);
                  }}
                  deleteOnClick={() => onDeleteOptionImageHandler(index)}
                  doneOnClick={() => {
                    setShowOptionImageUploadModal((prev) => {
                      const newModals = [...prev];
                      newModals[index] = false;
                      return newModals;
                    });
                  }}
                />
              )}
            </div>
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
      {showQuestionImageUploadModal && (
        <ImageUploadModal
          onClose={() => setShowQuestionImageUploadModal(false)}
          SetImage={setQuestionImage}
          deleteOnClick={() => setQuestionImage("")}
          doneOnClick={() => setShowQuestionImageUploadModal(false)}
        />
      )}
    </div>
  );
}

export default CreateQuestion;
