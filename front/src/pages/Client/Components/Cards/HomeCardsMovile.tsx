import { Link } from 'react-router-dom';

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

function HomeCardsMovile({ data, descount }: { data: Data; descount: boolean }) {
  return (
    <div className=' bg-Black-full rounded-xl  flex flex-col overflow-hidden border-solid border-[2px] border-bright-sun-600 shadow-md h-[325px] w-[150px] xsm:w-[170px] xss:w-[190px] xss:h-[350px]'>
      {/* Card image */}
      <Link to={`/detail/${data._id}`}>
        <div className='w-full h-[180px]'>
          <img
            className='w-full h-full object-cover aspect-square object-center'
            src={data.picture}></img>
        </div>
      </Link>

      {/* Card info */}
      <Link to={`/detail/${data._id}`}>
        <div className='bg-Black-full  p-2 flex flex-col items-center text-center text-base'>
          <p className='font-semibold text-bright-sun-50'>
            {data.name.substring(0, 30).toUpperCase()}...
          </p>
          <span className='line-clamp-1'>{data.brand.name}</span>
          {descount && (
            <p className='m-0 p-0 line-through'>
              ${Number(data.referencePrice).toLocaleString('es-ES')}
            </p>
          )}
          <span className='text-bright-sun-600 font-bold text-xl pt-2'>
            ${Number(data.sellingPrice).toLocaleString('es-ES')}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default HomeCardsMovile;
