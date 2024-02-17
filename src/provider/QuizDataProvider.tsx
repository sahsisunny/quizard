import React, { createContext, useContext, useState } from 'react';

interface Question {
  question: string;
  type: string;
  points: number;
  time: number;
  difficulty: string;
  options: string[];
  answer: string[];
}

interface QuizSettings {
  title: string;
  coverImage: string;
  subject: string;
  grade: string;
  language: string;
  visibility: string;
  questions: Question[];
}

interface QuizDataContext {
  quizData: QuizSettings;
  setQuizData: React.Dispatch<React.SetStateAction<QuizSettings>>;
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
  },
  setQuizData: () => {},
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
  });

  return (
    <QuizDataContext.Provider value={{ quizData, setQuizData }}>
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
