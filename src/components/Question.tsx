import { QuestionProps } from '@/types';
import { useEffect, useState } from 'react';

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
      const compareFunction = () => Math.random() - 0.5;
      const sortedOptions = initialOptions.toSorted(compareFunction);
      setTotalOptions(sortedOptions);
    };

    sortOptions();
  }, [answer, options]);

  const selectOption = (selectedOption: string) => {
    setSelected(selectedOption);
    setAnsweredQuestions((prevState) => prevState + 1); // fix issue with setState reshuffling the options array
    if (selectedOption === correctOption) {
      setCorrectAnswers((prevState) => prevState + 1);
    }
  };
  // console.log(answeredQuestions);

  return (
    <li className='border-b-2 border-border pb-5'>
      <div className='flex flex-col gap-3'>
        <p className='text-dark font-bold'>{question}</p>
        <ul className='flex gap-4 flex-wrap text-sm'>
          {totalOptions?.map((option: string, index: number) => (
            <li className='text-dark' key={index}>
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
                }  border border-dark rounded-lg py-0.5 px-5 focus-visible:border-transparent focus-visible:outline-2 outline-offset-2 outline-accent`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Question;
