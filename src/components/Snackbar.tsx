import React, { useState, useEffect } from 'react';

const Snackbar = ({
  message,
  show,
  close,
}: {
  message: string;
  show: boolean;
  close: () => void;
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      close();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [close]);

  return (
    <div
      className={`fixed w-fit z-50 top-4 p-3 rounded-sm bg-[#FF5555] text-white font-bold transition-transform duration-300 ${
        show ? 'transform translate-x-1' : '-translate-x-full'
      }`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
