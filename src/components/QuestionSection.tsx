import { useState } from 'react';

import Modal from '@/components/reusable/Modal';
import {
    gradeLevel, language, questionDifficulty, questionPoints, questionSubject, questionTime,
    questionType, visibility
} from '@/data/selectors';
import { useActiveQuestion, useQuizData } from '@/provider/QuizDataProvider';

import AddExplanation from './AddExplanation';
import CreateQuestion from './CreateQuestion';
import QuizSettingModal from './modals/QuizSettingModal';
import QuestionSettings from './QuestionSettings';
import QuizSettings from './QuizSettings';
import AddQuestionText from './reusable/AddQuestionText';

function QuestionSection() {
  const { quizData, setQuizData } = useQuizData();
  const { activeQuestion } = useActiveQuestion();
  const [showModal, setShowModal] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(true);
  const activeQuestionData = quizData.questions[activeQuestion];

  const showExplanationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (activeQuestionData) {
      setShowExplanation(true);
      setShowCreateQuestion(false);
    } else {
      alert("Please add a question first");
    }
  };

  const showCreateQuestionHandler = () => {
    setShowCreateQuestion(true);
    setShowExplanation(false);
  };

  const deleteExplanationHandler = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question, index) =>
        index === activeQuestion
          ? {
              ...question,
              explanation: {
                text: "",
                image: "",
              },
            }
          : question,
      ),
    }));
    setShowExplanation(false);
  };

  return (
    <div className="w-full min-h-[73vh]">
      <QuizSettings
        title={quizData.title || "Untitled Quiz"}
        onClickTitle={() => setShowModal(true)}
        addExplanationHandler={(e) => showExplanationHandler(e as any)}
      />

      <QuestionSettings
        questionDifficulty={questionDifficulty}
        questionPoints={questionPoints}
        questionTime={questionTime}
        questionType={questionType}
      />
      {showCreateQuestion && <CreateQuestion />}
      {showExplanation && (
        <AddExplanation
          backToQuestion={showCreateQuestionHandler}
          deleteExplanation={deleteExplanationHandler}
        />
      )}
      {!activeQuestionData && <AddQuestionText />}

      {showModal && (
        <Modal
          title="Edit Quiz Cover"
          subtitle="Review your quiz before publishing"
          onClose={() => setShowModal(false)}
        >
          <QuizSettingModal
            onClose={() => setShowModal(false)}
            questionSubject={questionSubject}
            gradeLevel={gradeLevel}
            language={language}
            visibility={visibility}
          />
        </Modal>
      )}
    </div>
  );
}

export default QuestionSection;
