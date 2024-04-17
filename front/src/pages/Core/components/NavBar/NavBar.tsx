import { BsFillHouseDoorFill } from 'react-icons/bs';
import { BsListUl } from 'react-icons/bs';
import { BsTagFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsCartFill } from 'react-icons/bs';

export default function NavBar() {
  return (
    <div className='flex justify-between bg-zeus-975 border-t-2 border-b-2 border-x-0 border-solid border-bright-sun-600'>
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
  );
}
