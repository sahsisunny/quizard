import React, { createContext, useContext, useState } from 'react';

interface Question {
  question: string;
  type: string;
  points: string;
  time: string;
  difficulty: string;
  options: string[];
  answer: string[];
  explanation: {
    text: string;
    image?: string;
  };
}

interface QuizSettings {
  title: string;
  coverImage: string;
  subject: string;
  grade: string;
  language: string;
  visibility: string;
  questions: Question[];
  tags: string[];
}

interface QuizDataContext {
  quizData: QuizSettings;
  setQuizData: React.Dispatch<React.SetStateAction<QuizSettings>>;
  activeQuestion: number;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
  updateQuestion: (index: number, updatedQuestion: Question) => void;
}

const QuizDataContext = createContext<QuizDataContext>({
  quizData: {
    title: "",
    coverImage: "",
    subject: "",
    grade: "",
    language: "",
    visibility: "",
    questions: [],
    tags: [],
  },
  setQuizData: () => {},
  activeQuestion: 0,
  setActiveQuestion: () => {},
  updateQuestion: () => {},
});

export const QuizDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quizData, setQuizData] = useState<QuizSettings>({
    title: "",
    coverImage: "",
    subject: "",
    grade: "",
    language: "",
    visibility: "",
    questions: [],
    tags: [],
  });
  const [activeQuestion, setActiveQuestion] = useState(0);

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index] = updatedQuestion;
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  return (
    <QuizDataContext.Provider
      value={{
        quizData,
        setQuizData,
        activeQuestion,
        setActiveQuestion,
        updateQuestion,
      }}
    >
      {children}
    </QuizDataContext.Provider>
  );
};

export const useQuizData = () => {
  const context = useContext(QuizDataContext);
  if (!context) {
    throw new Error("useQuizData must be used within a QuizDataProvider");
  }
  return context;
};

export const useActiveQuestion = () => {
  const context = useContext(QuizDataContext);
  if (!context) {
    throw new Error("useActiveQuestion must be used within a QuizDataProvider");
  }
  return context;
};
