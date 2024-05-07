interface Data {
  title: string;
  brand: string;
  rating: number;
  price: number;
  image: string;
}
function HomeCardsMovile({ data }: { data: Data }) {
  return (
    <div className=' bg-athens-gray-100 rounded-xl  flex flex-col overflow-hidden border-solid border-[2px] border-bright-sun-600 shadow-md h-[325px] w-[150px] xsm:w-[170px] xss:w-[190px] xss:h-[350px]'>
      {/* Card image */}
      <div className='w-full h-[180px]'>
        <img
          className='w-full h-full object-cover aspect-square object-center'
          src={data.image}></img>
      </div>

      {/* Card info */}
      <div className='text-athens-gray-950 p-2 flex flex-col items-center text-center text-base'>
        <p className='font-semibold'>{data.title.substring(0, 30).toUpperCase()}...</p>
        <span className='line-clamp-1'>{data.brand}</span>

        <span className='text-bright-sun-600 font-bold text-xl pt-2'>
          ${Number(data.price).toLocaleString('es-ES')}
        </span>
      </div>
    </div>
  );
}

export default HomeCardsMovile;
