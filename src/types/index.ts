export type Results = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export interface QuestionProps {
  question: string;
  answer: string;
  options: string[];
};
