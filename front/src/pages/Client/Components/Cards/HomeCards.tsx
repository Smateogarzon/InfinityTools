import { useEffect, useState } from 'react';
import HomeCard from '../Card/HomeCard';
import HomeCardsMovile from './HomeCardsMovile';

interface Data {
  _id: string;
  name: string;
  brand: {
    name: string;
  };
  referencePrice: number;
  sellingPrice: number;
  picture: string;
  NumberReviews: number;
}

function HomeCards({
  title,
  data,
  descount,
}: {
  title: string;
  data: Array<Data>;
  descount: boolean;
}) {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);

  return (
    <div className='my-[50px]'>
      <h4 className='text-3xl text-bright-sun-600 text-center italic'>{title.toUpperCase()}</h4>

      <div className='flex flex-wrap justify-center w-full gap-3 smm: max-w-[1000px] mx-auto'>
        {data?.map((data) => {
          return width > 599 ? (
            <HomeCard key={data._id} data={data} descount={descount} />
          ) : (
            <HomeCardsMovile key={data._id} data={data} descount={descount} />
          );
        })}
      </div>
    </div>
  );
}

export default HomeCards;
