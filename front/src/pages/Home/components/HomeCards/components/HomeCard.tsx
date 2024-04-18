import Rating from '@mui/material/Rating';

interface Data {
  title: string;
  brand: string;
  rating: number;
  price: number;
  image: string;
}

const HomeCard = ({ data }: { data: Data }) => {
  return (
    <div className='h-[450px] w-[225px] bg-athens-gray-100 rounded-xl m-10 flex flex-col overflow-hidden border-solid border-[3px] border-bright-sun-600 shadow-md'>
      {/* Card image */}
      <div className='w-full aspect-square'>
        <img className='w-full h-full object-cover aspect-square' src={data.image}></img>
      </div>

      {/* Card info */}
      <div className='text-athens-gray-950 p-2 flex flex-col items-center text-center'>
        <p className='font-semibold'>{data.title.toUpperCase()}</p>
        <span className='line-clamp-1'>{data.brand}</span>

        <Rating name='read-only' value={data.rating} size='small' readOnly />

        <span className='text-bright-sun-600 font-bold text-xl pt-2'>
          ${Number(data.price).toLocaleString('es-ES')}
        </span>

        <button className='border-none py-1 px-2 font-semibold text-lg rounded-xl transition-all my-2 bg-bright-sun-600 text-bright-sun-950 hover:bg-opacity-85 active:bg-opacity-75'>
          Ver más
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
