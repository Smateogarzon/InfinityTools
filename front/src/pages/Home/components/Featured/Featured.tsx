interface Featured {
  name: string;
  image: string;
}

export default function Featured() {
  const featured: Featured[] = [
    {
      name: 'Sierras',
      image: 'https://www.ecured.cu/images/c/c2/Bosch-gks-65-sierra-circular-gks65.jpg',
    },
    {
      name: 'Taladros',
      image: 'https://http2.mlstatic.com/D_NQ_NP_917518-MLA44737119055_012021-O.webp',
    },
    {
      name: 'Motosierras',
      image: 'https://cdn.rumbosrl.com.ar/uploads/products/images/large/7156738_1.png',
    },
    {
      name: 'Atornilladores',
      image: 'https://maquinariasboedo.com/wp-content/uploads/2014/08/CARATULA-34.png',
    },
  ];

  return (
    <div className='my-5'>
      <h3 className='relative text-center text-4xl text-bright-sun-600 mb-7 italic'>
        CATEGORÍAS DESTACADAS
      </h3>

      <ul className='flex max-w-[600px] w-full justify-around mx-auto'>
        {featured.map((item, i) => {
          return (
            <li
              key={i}
              className='flex flex-col items-center drop-shadow-lg hover:cursor-pointer [&>div>img]:hover:p-1 [&>span]:hover:text-bright-sun-500 [&>div]:hover:border-bright-sun-500 [&>div]:hover:shadow-[0_0_15px_-5px_#f9a207]'>
              <div className='transition-all hover:transition-all rounded-full w-[100px] h-[100px] overflow-hidden border-[6px] border-solid border-bright-sun-600'>
                <img
                  className='w-full h-full object-cover bg-[#ffffff] p-3 transition-all hover:transition-all'
                  src={item.image}
                  alt={`${item.name} destacados en Infinity Tools`}></img>
              </div>

              <span className='mt-2 transition hover:transition'>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
