import { BsFillHouseDoorFill, BsListUl, BsTagFill } from 'react-icons/bs';

function SpanPhone({ setShowMenu, setShowCategory }: any) {
  return (
    <>
      <div className='absolute z-9 top-[0vh] right-[-94vw] w-[100vw] h-[100vh] bg-zeus-975'></div>
      <div
        className={`animate-duration-700 animate-blurred-fade-in absolute z-10 top-[30vh] left-[4vw] flex justify-between bg-Black-high h-[350px] w-[80vw] rounded-xl`}>
        {/* Nav start */}
        <ul className='flex  items-center justify-center flex-col gap-10  [&>li]:hover:text-bright-sun-400 w-full border-y-4 border-x-0 border-solid border-bright-sun-600'>
          <li className='[&>a]:text-3xl '>
            <a
              href='/'
              className='hover:text-bright-sun-400 transition text-xl font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsFillHouseDoorFill className='mr-2' onClick={() => setShowMenu(false)} />
              <span className='translate-y-[1px]'>Inicio</span>
            </a>
          </li>
          <li
            onClick={() => {
              setShowMenu(false);
              setShowCategory(true);
            }}
            className='text-3xl hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
            <BsListUl className='mr-2' />
            <span className='translate-y-[1px]'>Categorías</span>
          </li>
          <li className='[&>a]:text-2xl xsm:[&>a]:text-3xl'>
            <a
              href='/'
              className='hover:text-bright-sun-400 transition text-xl font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsTagFill className='mr-2' onClick={() => setShowMenu(false)} />
              <span className='translate-y-[1px]'>Ofertas del día</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SpanPhone;
