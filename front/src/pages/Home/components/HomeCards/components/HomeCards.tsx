import HomeCard from './HomeCard';

interface Data {
  title: string;
  brand: string;
  rating: number;
  price: number;
  image: string;
}

function HomeCards({ title }: { title: string }) {
  const arrayOfCards: Array<Data> = [
    {
      brand: 'Bosch Herramientas',
      title: 'PULIDORA INALÁMBRICA BOSCH GWS 180-LI 18V SIN SATERIA',
      rating: 4,
      price: 175000,
      image: 'https://http2.mlstatic.com/D_NQ_NP_932141-MLU72756927398_112023-O.webp',
    },
    {
      brand: 'Bosch Herramientas',
      title: 'PULIDORA INALÁMBRICA BOSCH GWS 180-LI 18V SIN SATERIA',
      rating: 4,
      price: 175000,
      image: 'https://http2.mlstatic.com/D_NQ_NP_932141-MLU72756927398_112023-O.webp',
    },
    {
      brand: 'Bosch Herramientas',
      title: 'PULIDORA INALÁMBRICA BOSCH GWS 180-LI 18V SIN SATERIA',
      rating: 4,
      price: 175000,
      image: 'https://http2.mlstatic.com/D_NQ_NP_932141-MLU72756927398_112023-O.webp',
    },
    {
      brand: 'Bosch Herramientas',
      title: 'PULIDORA INALÁMBRICA BOSCH GWS 180-LI 18V SIN SATERIA',
      rating: 4,
      price: 175000,
      image: 'https://http2.mlstatic.com/D_NQ_NP_932141-MLU72756927398_112023-O.webp',
    },
    {
      brand: 'Bosch Herramientas',
      title: 'PULIDORA INALÁMBRICA BOSCH GWS 180-LI 18V SIN SATERIA',
      rating: 4,
      price: 175000,
      image: 'https://http2.mlstatic.com/D_NQ_NP_932141-MLU72756927398_112023-O.webp',
    },
    {
      brand: 'Bosch Herramientas',
      title: 'PULIDORA INALÁMBRICA BOSCH GWS 180-LI 18V SIN SATERIA',
      rating: 4,
      price: 175000,
      image: 'https://http2.mlstatic.com/D_NQ_NP_932141-MLU72756927398_112023-O.webp',
    },
  ];

  return (
    <div className='my-[50px]'>
      <h4 className='text-2xl text-bright-sun-600 text-center italic'>{title.toUpperCase()}</h4>

      <div className='flex flex-wrap justify-center w-full max-w-[1000px] mx-auto'>
        {arrayOfCards.map((data, i) => {
          return <HomeCard key={i} data={data} />;
        })}
      </div>
    </div>
  );
}

export default HomeCards;
