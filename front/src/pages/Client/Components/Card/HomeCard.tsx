import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
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

const HomeCard = ({ data, descount }: { data: Data; descount: boolean }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${data._id}`);
  };

  return (
    <div className='h-[450px] w-[225px] bg-Black-full rounded-xl m-10 flex flex-col overflow-hidden border-solid border-[2px] border-bright-sun-600 shadow-md'>
      {/* Card image */}
      <div className='w-full aspect-square'>
        <img className='w-full h-full object-cover aspect-square' src={data.picture}></img>
      </div>

      {/* Card info */}
      <div className='bg-Black-full p-2 flex flex-col items-center text-center justify-center h-1/2'>
        <p className='font-semibold text-bright-sun-50'>{data.name.toUpperCase()}</p>
        <span className='line-clamp-1'>{data.brand.name}</span>

        <Rating name='read-only' value={data.NumberReviews} size='small' readOnly />
        {descount && (
          <p className='m-0 p-0 line-through'>
            ${Number(data.referencePrice).toLocaleString('es-ES')}
          </p>
        )}
        <span className='text-bright-sun-600 font-bold text-xl pt-2'>
          ${Number(data.sellingPrice).toLocaleString('es-ES')}
        </span>

        <button
          onClick={handleClick}
          className='cursor-pointer py-1 px-2 text-lg rounded-xl transition-all my-2 bg-[#00000000] text-zeus-50 border-solid border-[1px] border-x-zeus-50 hover:border-bright-sun-600 active:border-bright-sun-700 hover:bg-bright-sun-600 hover:text-Black-full hover:font-semibold active:bg-opacity-75'>
          Ver más
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
