export interface Question {
  question: {
    text: string;
    image?: string;
  };
  type: string;
  points: string;
  time: string;
  difficulty: string;
  options: {
    text: string;
    image?: string;
  }[];
  answer: {
    text: string;
    image?: string;
  }[];
  explanation: {
    text: string;
    image?: string;
  };
}

export interface QuizSettings {
  title: string;
  coverImage: string;
  subject: string;
  grade: string;
  language: string;
  visibility: string;
  questions: Question[];
  tags: string[];
}
