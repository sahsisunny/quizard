import { useState } from 'react';

import Modal from '@/components/Modal';

import AddExplanation from './AddExplanation';
import CreateQuestion from './CreateQuestion';
import QuestionSettingModal from './QuestionSettingModal';
import QuestionSettings from './QuestionSettings';
import QuizSettings from './QuizSettings';

function QuestionSection() {
  const [showModal, setShowModal] = useState(false);
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
        onClickTitle={() => setShowModal(true)}
        addExplanationHandler={(e) => showExplanationHandler(e as any)}
      />

      <QuestionSettings />
      {showCreateQuestion && <CreateQuestion />}
      {showExplanation && (
        <AddExplanation
          backToQuestion={showCreateQuestionHandler}
          saveExplanation={showCreateQuestionHandler}
          deleteExplanation={() => setShowExplanation(false)}
        />
      )}
      {showModal && (
        <Modal
          title="Edit Quiz Cover"
          subtitle="Review your quiz before publishing"
          onClose={() => setShowModal(false)}
        >
          <QuestionSettingModal
            title={title}
            inputOnChange={inputOnChangeHandler}
            error={errorMessages}
            saveOnClick={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default QuestionSection;
