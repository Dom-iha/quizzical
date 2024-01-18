import { AnswerStatus, QuestionProps } from '@/types';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';

const Question: React.FC<QuestionProps> = ({ question, options, answer, showResults, setAnsweredQuestions, setCorrectAnswers,}) => {
  
  const [selected, setSelected] = useState<string>();
  const [correctOption, setCorrectOption] = useState(answer);
  const [totalOptions, setTotalOptions] = useState<string[]>();
  const [pastQuestions, setPastQuestions] = useState<string[]>([]);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus[]>([]);

  useEffect(() => {
    const initialOptions = [...options, answer]; // create a complete options array by copying the original and adding the answer to the array

    const sortOptions = () => { // rearrange the array in a random order so that the correct answer is not always the last option
      
      const compareFunction = () => Math.random() - 0.5;
      const sortedOptions = initialOptions.toSorted(compareFunction);
      setTotalOptions(sortedOptions);
    };

    sortOptions();
  }, [answer, options]);

  const selectOption = (selectedOption: string, questionBeingAnswered: string) => {
    
    const hasBeenSelectedBefore = pastQuestions.includes(questionBeingAnswered); // Checks if the question has been answered before

    const isCorrect = selectedOption === correctOption; // Checks if the selected option is correct

    const wasPreviouslyCorrect = answerStatus.find((ans) => ans.Q === questionBeingAnswered)?.correct; // Finds the previous correctness state for the current question

    const answerBeingChanged = answerStatus.findIndex((ans) => ans.Q === questionBeingAnswered); // Finds the index of the current question in answerStatus

    setSelected(selectedOption); // Sets the selected option


    if (!hasBeenSelectedBefore) {
      // Increment the total number of answered questions
      setAnsweredQuestions((prevState) => prevState + 1);

      // Add the current question to the list of past questions
      setPastQuestions((prevPQ) => [...prevPQ, questionBeingAnswered]);

      // If the first answer is correct, increment correctAnswers
      if (isCorrect) {
        setCorrectAnswers((prevState) => prevState + 1);
      }

      // Add the newly answered question to the answerStatus array
      setAnswerStatus((prevState) => [
        ...prevState,
        {
          Q: questionBeingAnswered,
          correct: isCorrect,
        },
      ]);
    } else {
      // Adjust correctAnswers count based on the change in the answer
      if (wasPreviouslyCorrect !== undefined) {
        if (wasPreviouslyCorrect && isCorrect) {
          // If the previous answer was correct and the new answer is also correct, do nothing with correctAnswers
          setCorrectAnswers((prevState) => prevState);

        } else if (wasPreviouslyCorrect && !isCorrect) {
          // If the previous answer was correct and the new answer is incorrect, decrement correctAnswers
          setCorrectAnswers((prevState) => prevState - 1);

        } else if (!wasPreviouslyCorrect && !isCorrect) {
          // If the previous answer was incorrect and the new answer is also incorrect, do nothing with correctAnswers
          setCorrectAnswers((prevState) => prevState);

        } else if (!wasPreviouslyCorrect && isCorrect) {
          // If the previous answer was incorrect and the new answer is correct, increment correctAnswers
          setCorrectAnswers((prevState) => prevState + 1);

        }
      }

      // Update answerStatus for the existing question 
      setAnswerStatus((prevState) => [
        ...prevState.slice(0, answerBeingChanged),
        {
          Q: questionBeingAnswered,
          correct: isCorrect,
        },
        ...prevState.slice(answerBeingChanged + 1),
      ]);
    }
  };

  return (
    <li className='text-darkBlue border-b-2 border-border pb-5'>
      <div className='flex flex-col gap-3'>
        <p className='text-dark font-bold text-lg md:text-xl'>
          {decode(question)}
        </p>
        <ul className='flex gap-4 flex-wrap max-md:text-sm'>
          {totalOptions?.map((option: string, index: number) => (
            <li className='text-darkBlue' key={index}>
              <button
                type='button'
                onClick={() => selectOption(option, question)}
                className={`${
                  !showResults && selected === option ? 'bg-selected' : ''
                } ${
                  showResults && correctOption === option ? 'bg-correct' : ''
                } ${
                  showResults && selected === option
                    ? option !== correctOption && 'bg-incorrect'
                    : ''
                } ${
                  showResults && selected !== option
                    ? option === correctOption && 'border-transparent'
                    : ''
                } ${selected === option && 'border-transparent'} ${
                  showResults && selected !== option ? 'opacity-60' : ''
                }  border border-lightBlue rounded-lg py-0.5 px-5 focus-visible:border-transparent focus-visible:outline-2 outline-offset-2 outline-accent transition`}
              >
                {decode(option)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Question;
