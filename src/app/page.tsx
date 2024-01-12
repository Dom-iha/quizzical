import Link from 'next/link';

export default function Home() {
  return (
    <section className='grid place-content-center gap-4 items-center min-h-screen p-24'>
      <h1 className='font-bold text-dark text-center text-3xl'>Quizzical</h1>
      <p className='text-dark text-center mb-8'>
        Test your knowledge with this fun quiz.
      </p>
      <Link
        href='/questions'
        className='text-center text-light p-4 bg-dark rounded-xl'
      >
        Start quiz
      </Link>
    </section>
  );
}
