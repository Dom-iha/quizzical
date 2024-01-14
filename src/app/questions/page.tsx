'use client';
import Error from '@/components/Error';
import Loader from '@/components/Loader';
import Question from '@/components/Question';
import { ApiResponse, Results } from '@/types';
import { useState, useEffect } from 'react';

function Questions() {
  const [questions, setQuestions] = useState<Results[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const answeredQuestions = 0;

  const getQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5');
      const data: ApiResponse = await response.json();
      if (!response.ok) {
        setError(true);
      }
      console.log(data);
      setQuestions(data.results);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const DUMMY_QUESTIONS = [1, 2, 3, 4, 5];

  const checkAnswers = () => {
    if (answeredQuestions !== questions.length) {
      return;
    }
  };

  return (
    <section className='grid gap-10 max-w-screen-md px-5 py-10 mx-auto min-h-screen'>
      {loading ? (
        <Loader />
      ) : !loading && error ? (
        <Error onClick={() => getQuestions()} />
      ) : (
        <ul className='flex flex-col gap-4'>
          {questions?.map((question, index) => (
            <Question
              key={index}
              question={question.question}
              options={question.incorrect_answers}
              answer={question.correct_answer}
            />
          ))}
        </ul>
      )}
      {!loading && !error && (
        <button
          type='button'
          onClick={checkAnswers}
          className='place-self-center text-center text-light py-3 px-8 bg-dark rounded-xl'
        >
          Check answers
        </button>
      )}
    </section>
  );
}

export default Questions;
