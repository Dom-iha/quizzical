import Link from 'next/link';

export default function Home() {
  return (
    <section className='grid place-content-center gap-4 items-center min-h-screen p-24'>
      <h1 className='font-bold text-darkBlue text-center text-4xl'>Quizzical</h1>
      <p className='text-darkBlue text-center mb-8 text-lg'>
        Test your knowledge with this fun quiz.
      </p>
      <Link
        href='/questions'
        className='font-bold text-center text-light p-4 bg-lightBlue rounded-xl hover:text-darkBlue hover:bg-transparent border-[3px] border-lightBlue transition focus-visible:outline-accent'
      >
        Start quiz
      </Link>
    </section>
  );
}
