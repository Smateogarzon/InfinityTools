import animation from '../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';
import MiniCards from './miniCards';
import styled from './result.module.css';
/*eslint-disable*/

function ResultsSearch({
  loading,
  data,
  setName,
}: {
  loading: boolean;
  data: any;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className='absolute top-[50px] z-10 flex w-full bg-Black-full  items-center mt-2 rounded'>
      {loading ? (
        <div className='flex justify-center w-full'>
          <Lottie animationData={animation} className='w-[150px] h-[150px]' />
        </div>
      ) : (
        <div className={styled.container}>
          {data &&
            data.FindAllproductsFilter.map((data: any, i: number) => (
              <MiniCards key={i} data={data} setName={setName} />
            ))}
        </div>
      )}
    </div>
  );
}

export default ResultsSearch;
