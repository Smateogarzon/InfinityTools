import { BsFillHouseDoorFill } from 'react-icons/bs';
import { BsListUl } from 'react-icons/bs';
import { BsTagFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsCartFill } from 'react-icons/bs';
import { useRef, useState } from 'react';

export default function NavBar() {
  const navRef = useRef(null);
  const [sticking, setSticking] = useState<boolean>(false);

  window.onscroll = function () {
    stickToTop();
  };

  function stickToTop() {
    const stickyPos = 125;
    setSticking(window.scrollY >= stickyPos);
  }

  return (
    <>
      {sticking && <div className='h-[55px]'></div>}
      <div
        ref={navRef}
        className={`flex justify-between bg-zeus-975 border-t-2 border-b-2 border-x-0 border-solid border-bright-sun-600 ${sticking ? 'fixed top-0 w-full z-10 max-w-[1366px]' : ' '}`}>
        {/* Nav start */}
        <ul className='flex h-[55px] items-center'>
          <li className='mx-5 '>
            <a
              href='/'
              className='hover:text-bright-sun-400 transition text-xl font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsFillHouseDoorFill className='mr-2' />
              <span className='translate-y-[1px]'>Inicio</span>
            </a>
          </li>
          <li className='mx-5'>
            <a
              href='/'
              className='hover:text-bright-sun-400 transition text-xl font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsListUl className='mr-2' />
              <span className='translate-y-[1px]'>Categorías</span>
            </a>
          </li>
          <li className='mx-5'>
            <a
              href='/'
              className='hover:text-bright-sun-400 transition text-xl font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsTagFill className='mr-2' />
              <span className='translate-y-[1px]'>Ofertas del día</span>
            </a>
          </li>
        </ul>

        {/* Nav end */}
        <ul className='flex items-center'>
          <li className='mx-5'>
            <a
              href='/'
              className='hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsFillPersonFill className='h-[30px] w-[30px]' />
            </a>
          </li>

          <li className='mx-5'>
            <a
              href='/'
              className='hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsCartFill className='h-[25px] w-[25px]' />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
