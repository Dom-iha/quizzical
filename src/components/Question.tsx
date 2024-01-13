import { QuestionProps } from '@/types';
import { useEffect, useState } from 'react';

const Question: React.FC<QuestionProps> = ({ question, options, answer }) => {
  const [selected, setSelected] = useState<number>();
  const [correctanswer, setCorrectAnswer] = useState(answer);
  const [totalOptions, setTotalOptions] = useState<string[]>();

  // const DUMMY_OPTIONS = ['Adiós', 'Hola', 'Au Revoir', 'Salir'];

  useEffect(() => {
    const initialOptions = [...options, answer]; // create a complete options array by copying the original and adding the answer to the array
    
    const sortOptions = () => {
      const compareFunction = () => Math.random() - 0.5;
      // console.log('original:' + DUMMY_OPTIONS);
      // console.log('sorted:' + DUMMY_OPTIONS.toSorted(compareFunction));
      const sortedOptions = initialOptions.toSorted(compareFunction);
      setTotalOptions(sortedOptions);
    };

    sortOptions();
  }, [answer, options]);

  return (
    <li className='border-b-2 border-border pb-5'>
      <div className='flex flex-col gap-3'>
        <p className='text-dark font-bold'>
          {question}
          {/* How do you say goodbye in spanish */}
        </p>
        <ul className='flex gap-4 flex-wrap text-sm'>
          {totalOptions?.map((option: string, index: number) => (
            <li className='text-dark' key={index}>
              <button
                type='button'
                onClick={() => setSelected(index)}
                className={`${
                  selected === index && 'bg-selected'
                } border border-dark rounded-lg px-5`}
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
