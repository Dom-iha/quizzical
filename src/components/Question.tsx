import { QuestionProps } from '@/types';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  answer,
  showResults,
  setAnsweredQuestions,
  setCorrectAnswers,
}) => {
  const [selected, setSelected] = useState<string>();
  const [correctOption, setCorrectOption] = useState(answer);
  const [totalOptions, setTotalOptions] = useState<string[]>();

  useEffect(() => {
    const initialOptions = [...options, answer]; // create a complete options array by copying the original and adding the answer to the array

    const sortOptions = () => {
      // rearrange the array in a random order so that the correct answer is not always the last option
      const compareFunction = () => Math.random() - 0.5;
      const sortedOptions = initialOptions.toSorted(compareFunction);
      setTotalOptions(sortedOptions);
    };

    sortOptions();
  }, [answer, options]);

  const selectOption = (selectedOption: string) => {
    setSelected(selectedOption);
    setAnsweredQuestions((prevState) => prevState + 1);
    if (selectedOption === correctOption) {
      setCorrectAnswers((prevState) => prevState + 1);
    }
  };

  

  return (
    <li className='text-darkBlue border-b-2 border-border pb-5'>
      <div className='flex flex-col gap-3'>
        <p className='text-dark font-bold text-lg md:text-xl'>{decode(question)}</p>
        <ul className='flex gap-4 flex-wrap max-md:text-sm'>
          {totalOptions?.map((option: string, index: number) => (
            <li className='text-darkBlue' key={index}>
              <button
                type='button'
                onClick={() => selectOption(option)}
                disabled={showResults}
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
