export type Results = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type ApiResponse = {
  response_code: number;
  results: Results[];
};

export interface QuestionProps {
  question: string;
  answer: string;
  options: string[];
  answeredQuestions: number;
  setAnsweredQuestions: React.Dispatch<React.SetStateAction<number>>;
  showResults: boolean;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
}

export interface ErrorProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type AnswerStatus = {
  Q: string;
  correct: boolean;
}
