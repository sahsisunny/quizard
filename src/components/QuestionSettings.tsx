import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';

import Modal from '@/components/reusable/Modal';
import { useActiveQuestion, useQuizData } from '@/provider/QuizDataProvider';

import Selector from './reusable/Selector';

interface QuestionSettingsProps {
  questionDifficulty: { [key: string]: string };
  questionPoints: { [key: string]: string };
  questionTime: { [key: string]: string };
  questionType: { [key: string]: string };
}

function QuestionSettings({
  questionDifficulty,
  questionPoints,
  questionTime,
  questionType,
}: QuestionSettingsProps) {
  const [showModal, setShowModal] = useState(false);
  const { activeQuestion } = useActiveQuestion();
  const { quizData, setQuizData } = useQuizData();

  const updateQuestion = (field: string, value: string) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[activeQuestion] = {
      ...updatedQuestions[activeQuestion],
      [field]: value,
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const onClickClose = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const activeQuestionData = quizData.questions[activeQuestion];
  if (!activeQuestionData) return null;

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-2 h-[8vh]">
        <Selector
          options={questionType}
          name="Type"
          width="w-[100px]"
          onSelect={(option) => updateQuestion("type", option.value)}
          selectedOption={activeQuestionData.type || "Type"}
        />
        <div className="lg:flex flex-row gap-2 hidden">
          <Selector
            options={questionPoints}
            name="Points"
            onSelect={(option) => updateQuestion("points", option.value)}
            selectedOption={activeQuestionData.points || "Points"}
          />
          <Selector
            options={questionTime}
            name="Time"
            onSelect={(option) => updateQuestion("time", option.value)}
            selectedOption={activeQuestionData.time || "Time"}
          />
          <Selector
            options={questionDifficulty}
            name="Difficulty"
            onSelect={(option) => updateQuestion("difficulty", option.value)}
            selectedOption={activeQuestionData.difficulty || "Difficulty"}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 lg:hidden">
          <button
            onClick={openModal}
            className="bg-gray-800 text-white px-3 py-2 rounded-md hover:shadow-md flex items-center gap-2"
          >
            <IoMdSettings />
            <span className="hidden sm:block text-sm">Question Settings</span>
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          title="Question Settings"
          subtitle="Select the question settings"
          onClose={onClickClose}
        >
          <div className="flex flex-wrap justify-around items-center gap-2">
            <Selector
              options={questionPoints}
              name="Points"
              onSelect={(option) => updateQuestion("points", option.value)}
              selectedOption={activeQuestionData.points || "Points"}
            />
            <Selector
              options={questionTime}
              name="Time"
              onSelect={(option) => updateQuestion("time", option.value)}
              selectedOption={activeQuestionData.time || "Time"}
            />
            <Selector
              options={questionDifficulty}
              name="Difficulty"
              onSelect={(option) => updateQuestion("difficulty", option.value)}
              selectedOption={activeQuestionData.difficulty || "Difficulty"}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default QuestionSettings;
