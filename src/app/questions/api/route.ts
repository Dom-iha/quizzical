import { ApiResponse } from '@/types';

export const getQuestions = async () => {
  const response = await fetch('https://opentdb.com/api.php?amount=5');
  const data: ApiResponse = await response.json();

  return Response.json({ data });
};
