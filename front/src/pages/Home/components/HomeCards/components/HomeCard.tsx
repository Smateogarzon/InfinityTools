import Rating from '@mui/material/Rating';

interface Data {
  title: string;
  brand: string;
  rating: number;
  price: number;
  image: string;
}

export default function HomeCard() {
  const data: Data = {
    brand: 'Bosch Herramientas',
    title: 'PULIDORA INALÁMBRICA BOSCH GWS 180-LI 18V SIN SATERIA',
    rating: 4,
    price: 175000,
    image: 'https://http2.mlstatic.com/D_NQ_NP_932141-MLU72756927398_112023-O.webp',
  };

  return (
    <div className='h-[400px] w-[225px] bg-athens-gray-100 rounded-xl m-10 flex flex-col overflow-hidden border-solid border-[3px] border-bright-sun-600 shadow-md'>
      {/* Card image */}
      <div className='w-full aspect-square'>
        <img className='w-full h-full object-cover' src={data.image}></img>
      </div>

      {/* Card info */}
      <div className='text-athens-gray-950 p-2 flex flex-col items-center text-center'>
        <span className='line-clamp-1'>{data.brand}</span>
        <p>{data.title}</p>

        <Rating name='read-only' value={data.rating} size='small' readOnly />

        <br></br>
        <span>{Number(data.price).toLocaleString('es-ES')}</span>
        <br></br>
        <button>Ver más</button>
      </div>
    </div>
  );
}
