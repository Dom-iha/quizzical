import classes from './Loader.module.css';

function Loader() {
  return (
    <div className='flex flex-wrap items-center gap-2 place-content-center font-medium text-dark'>
      <div className='item'>
        <div className={classes.loader}></div>
      </div>
      <p>Setting your questions...</p>
    </div>
  );
}

export default Loader;
