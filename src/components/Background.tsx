import Image from 'next/image';
import topblob from '../../public/topblob.svg';
import bottomblob from '../../public/bottomblob.svg';

function Background() {
  return (
    <>
      <Image
        alt=''
        src={topblob}
        className='absolute top-0 right-0 -z-10'
      ></Image>
      <Image
        alt=''
        src={bottomblob}
        className='absolute bottom-0 left-0 -z-10'
      ></Image>
    </>
  );
}

export default Background;
