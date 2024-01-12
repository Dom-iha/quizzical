import { QuestionProps } from '@/types';
import { useState } from 'react';

const Question: React.FC<QuestionProps> = ({ question, options, answer }) =>{
  const [selected, setSelected] = useState<boolean>();
  const [correctanswer, setCorrectAnswer] = useState(answer);
  
  const DUMMY_OPTIONS = ['Adiós', 'Hola', 'Au Revoir', 'Salir'];

  return (
    <li className='border-b-2 border-border pb-5'>
      <div className='flex flex-col gap-3'>
        <p className='text-dark font-bold'>
          {question}
        </p>
        <ul className='flex gap-4 flex-wrap text-sm'>
          {options.map((option:string, index:number) => (
            <li className='text-dark' key={index}>
              <button
                type='button'
                onClick={() => setSelected(!selected)}
                className={`${selected && 'bg-selected'} border border-dark rounded-lg px-5`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default Question;
