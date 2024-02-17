"use client";
import Image from 'next/image';
import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import ModelComponent from '@/components/ModelComponent';

import TextEditor from '../TextEditor';
import AddExplanation from './AddExplanation';
import CreateQuestionArea from './CreateQuestionArea';
import QuestionSettingModal from './QuestionSettingModal';
import QuestionSettings from './QuestionSettings';
import QuizSettings from './QuizSettings';

function QuestionSection() {
  const [showModel, setShowModel] = useState(false);
  const [title, setTitle] = useState("Untitled quiz");
  const [errorMessages, setErrorMessages] = useState("This field is required");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(true);

  const showExplanationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowExplanation(true);
    setShowCreateQuestion(false);
  };

  const showCreateQuestionHandler = () => {
    setShowCreateQuestion(true);
    setShowExplanation(false);
  };

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 5) {
      setErrorMessages("Title must be more than 5 characters");
    } else {
      setErrorMessages("");
    }
    setTitle(value);
    console.log(value);
  };

  return (
    <div className="w-full min-h-[90vh]">
      <QuizSettings
        title={title}
        onClickTitle={() => setShowModel(true)}
        addExplanationHandler={(e) => showExplanationHandler(e as any)}
      />

      <QuestionSettings />
      {showCreateQuestion && <CreateQuestionArea />}
      {showExplanation && (
        <AddExplanation
          backToQuestion={showCreateQuestionHandler}
          saveExplanation={showCreateQuestionHandler}
          deleteExplanation={() => setShowExplanation(false)}
        />
      )}
      {showModel && (
        <ModelComponent
          title="Edit Quiz Cover"
          subtitle="Review your quiz before publishing"
          onClose={() => setShowModel(false)}
        >
          <QuestionSettingModal
            title={title}
            inputOnChange={inputOnChangeHandler}
            error={errorMessages}
            saveOnClick={() => setShowModel(false)}
          />
        </ModelComponent>
      )}
    </div>
  );
}

export default QuestionSection;
