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
};

export interface ErrorProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}