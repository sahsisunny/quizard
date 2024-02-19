import React, { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import { editorBackColors, editorColors } from '@/data/colors';
import { useActiveQuestion, useQuizData } from '@/provider/QuizDataProvider';

import ImageUploadModal from './modals/ImageUploadModal';
import ImageComponent from './reusable/ImageComponent';
import TextEditor from './reusable/TextEditor';

interface Editor {
  id: number;
}

interface Option {
  text: string;
  image: string;
}

interface Question {
  text: string;
  image: string;
}

interface QuizQuestion {
  question: Question;
  options: Option[];
  answer: Option[];
  type: "SINGLE" | "MULTIPLE";
}

function CreateQuestion() {
  const { activeQuestion } = useActiveQuestion();
  const { quizData, setQuizData } = useQuizData();
  const activeQuestionData = quizData.questions[activeQuestion] as QuizQuestion;
  const [showQuestionImageUploadModal, setShowQuestionImageUploadModal] =
    useState(false);
  const [showOptionImageUploadModal, setShowOptionImageUploadModal] = useState(
    new Array<boolean>(5).fill(false)
  );
  const [optionImages, setOptionImages] = useState<string[]>(
    new Array(5).fill("")
  );
  const [questionImage, setQuestionImage] = useState("");
  const [editors, setEditors] = useState<Editor[]>([{ id: 1 }, { id: 2 }]);

  useEffect(() => {
    if (activeQuestionData) {
      updateEditors(activeQuestionData);
      updateImages(activeQuestionData);
    }
  }, [activeQuestionData, quizData]);

  const updateEditors = (activeQuestionData: QuizQuestion) => {
    const newEditors = activeQuestionData?.options.map((_, index) => ({
      id: index,
    }));
    setEditors(newEditors.length > 0 ? newEditors : [{ id: 1 }, { id: 2 }]);
  };

  const updateImages = (activeQuestionData: QuizQuestion) => {
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
  };

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

  const onSaveQuestionImageHandler = () => {
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

  const onSaveOptionImageHandler = (index: number) => {
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

  const onImageUploadModalClose = (index: number) => {
    setShowOptionImageUploadModal((prev) => {
      const newModals = [...prev];
      newModals[index] = false;
      return newModals;
    });
  };

  return (
    <div className="flex flex-col items-center w-full p-2 min-h-[74vh]">
      <div className="flex flex-col w-full h-full gap-2 bg-red-900 p-2 rounded">
        <div className="flex lg:flex-row flex-col gap-2 h-1/2 border rounded">
          {questionImage && (
            <ImageComponent
              image={questionImage}
              setShowQuestionImageUploadModal={setShowQuestionImageUploadModal}
              onSaveImage={onSaveQuestionImageHandler}
              onDeleteImage={onDeleteQuestionImageHandler}
            />
          )}
          <div className="w-full h-full">
            <TextEditor
              toolbarStyles="bg-red-900 h-auto"
              editorStyles="bg-red-800 "
              placeholder="Type question here"
              value={activeQuestionData?.question.text || ""}
              isAutoFocus={true}
              onChange={(e) => onQuestionValueChange(e.target.value)}
              onImageClickHandler={() => setShowQuestionImageUploadModal(true)}
              isImageButton={!questionImage}
              imageDeleteHandler={onDeleteQuestionImageHandler}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 w-full">
          {editors.map((editor, index) => (
            <div
              key={editor.id}
              className={`relative w-full h-full fex flex-row rounded p-2 ${editorColors[index]}`}
            >
              <TextEditor
                key={editor.id}
                deleteButtonHandler={() => deleteEditorHandler(editor.id)}
                isDeleteButton={editors.length > 2}
                toolbarStyles={editorColors[index]}
                editorStyles={editorBackColors[index]}
                type={
                  activeQuestionData?.type === "SINGLE" ? "SINGLE" : "MULTIPLE"
                }
                onCheckRadio={(e) => onCheckRadioClickHandler(e, index)}
                placeholder={`Type option ${index + 1} here`}
                onChange={(e) => onOptionValueChange(e.target.value, index)}
                value={activeQuestionData?.options[index]?.text || ""}
                isRadioChecked={activeQuestionData?.answer.some(
                  (answer) =>
                    answer.text === activeQuestionData.options[index]?.text
                )}
                isCheckboxChecked={activeQuestionData?.answer.some(
                  (answer) =>
                    answer.text === activeQuestionData.options[index]?.text
                )}
                onCheckCheckbox={(e) => onCheckCheckboxClickHandler(e, index)}
                isDisabled={!activeQuestionData?.options[index]}
                isImageButton={!optionImages[index]}
                onImageClickHandler={() =>
                  setShowOptionImageUploadModal((prev) => {
                    const newModals = [...prev];
                    newModals[index] = true;
                    return newModals;
                  })
                }
                imageDeleteHandler={() => onDeleteOptionImageHandler(index)}
              />
              {optionImages[index] && (
                <ImageComponent
                  image={optionImages[index]}
                  setShowQuestionImageUploadModal={() =>
                    setShowOptionImageUploadModal((prev) => {
                      const newModals = [...prev];
                      newModals[index] = true;
                      return newModals;
                    })
                  }
                  onSaveImage={() => onSaveOptionImageHandler(index)}
                  onDeleteImage={() => onDeleteOptionImageHandler(index)}
                />
              )}
              {showOptionImageUploadModal[index] && (
                <ImageUploadModal
                  onClose={() => onImageUploadModalClose(index)}
                  SetImage={(image) => setImageBasedOnOption(index, image)}
                  deleteOnClick={() => onDeleteOptionImageHandler(index)}
                  doneOnClick={() => onImageUploadModalClose(index)}
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
