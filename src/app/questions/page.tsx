'use client';
import Question from '@/components/Question';
import { Results } from '@/types';
import { useState, useEffect } from 'react';

function Questions() {
  const [questions, setQuestions] = useState<Results[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => { // fix issue with next making two req's
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setLoading(false);
        // console.log(data.results);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const DUMMY_QUESTIONS = [1, 2, 3, 4, 5];

  const checkAnswers = () => {
    
  }

  return (
    <section className='grid gap-10 max-w-screen-md px-5 py-10 mx-auto min-h-screen'>
      {loading ? (
        <div className='grid place-content-center font-medium text-dark'>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className='grid place-content-center font-medium text-dark'>
          <p>An error occured while trying to get your questions.</p>
        </div>
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
