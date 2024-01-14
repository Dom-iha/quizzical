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
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const getQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5');
      const data: ApiResponse = await response.json();
      if (!response.ok) {
        setError(true);
      }
      // console.log(data);
      setQuestions(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // console.log(correctAnswers)

  // const DUMMY_QUESTIONS = [
  //   {
  //     type: 'multiple',
  //     difficulty: 'easy',
  //     category: 'Entertainment: Comics',
  //     question:
  //       'In &quot;Homestuck&quot; what is Dave Strider&#039;s guardian?',
  //     correct_answer: 'Bro',
  //     incorrect_answers: ['Becquerel', 'Doc Scratch', 'Halley'],
  //   },
  //   {
  //     type: 'multiple',
  //     difficulty: 'hard',
  //     category: 'Entertainment: Musicals &amp; Theatres',
  //     question:
  //       'Which of these plays was famously first performed posthumously after the playwright committed suicide?',
  //     correct_answer: '4.48 Psychosis',
  //     incorrect_answers: [
  //       'Hamilton',
  //       'Much Ado About Nothing',
  //       'The Birthday Party',
  //     ],
  //   },
  //   {
  //     type: 'multiple',
  //     difficulty: 'medium',
  //     category: 'History',
  //     question:
  //       'Who was the first president born in the independent United States?',
  //     correct_answer: 'Martin Van Buren',
  //     incorrect_answers: ['John Adams', 'George Washington', 'James Monroe '],
  //   },
  //   {
  //     type: 'multiple',
  //     difficulty: 'medium',
  //     category: 'Entertainment: Video Games',
  //     question:
  //       'What is the name of the virus in &quot;Metal Gear Solid 1&quot;?',
  //     correct_answer: 'FOXDIE',
  //     incorrect_answers: ['FOXENGINE', 'FOXALIVE', 'FOXKILL'],
  //   },
  //   {
  //     type: 'boolean',
  //     difficulty: 'easy',
  //     category: 'Geography',
  //     question: 'Alaska is the largest state in the United States.',
  //     correct_answer: 'True',
  //     incorrect_answers: ['False'],
  //   },
  // ];

  const checkAnswers = () => {
    if (answeredQuestions !== questions.length) {
      console.log('Please answer all questions before proceeding');
      return;
    }
    setShowResults(true);
    console.log('Submitted');
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
              showResults={showResults}
              setCorrectAnswers={setCorrectAnswers}
              answeredQuestions={answeredQuestions}
              setAnsweredQuestions={setAnsweredQuestions}
            />
          ))}
        </ul>
      )}
      {!showResults && !loading && !error && (
        <button
          type='button'
          onClick={checkAnswers}
          className='transition place-self-center text-center text-light py-3 px-8 bg-dark rounded-xl focus-visible:outline-2 focus-visible:bg-transparent focus-visible:outline-accent focus-visible:text-dark'
        >
          Check answers
        </button>
      )}
      {showResults && (
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          <p className='text-dark font-bold'>{`You got ${correctAnswers}/${questions.length} questions right`}</p>
          <button
            type='button'
            onClick={() => getQuestions()}
            className='transition place-self-center text-center text-light py-2 px-6 bg-dark rounded-xl focus-visible:outline-2 focus-visible:bg-transparent focus-visible:outline-accent focus-visible:text-dark'
          >
            Play again
          </button>
        </div>
      )}
    </section>
  );
}

export default Questions;
