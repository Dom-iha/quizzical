import React from 'react';
import { ErrorProps } from '@/types';

const Error: React.FC<ErrorProps> = ({ onClick }) => {
  return (
    <div className='flex gap-5 flex-col items-center place-content-center font-medium text-dark'>
      <p>An error occured while setting your questions.</p>
      <button
        type='button'
        className='place-self-center text-center text-light py-2 px-6 bg-dark rounded-xl'
        onClick={onClick}
      >
        Reset
      </button>
    </div>
  );
};

export default Error;
