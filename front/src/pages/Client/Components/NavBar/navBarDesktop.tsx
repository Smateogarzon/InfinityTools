import {
  BsCartFill,
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsListUl,
  BsTagFill,
} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function NavBarDesktop({ navRef, showLogout, logout, sticking }: any) {
  return (
    <div
      ref={navRef}
      className={`flex justify-between bg-zeus-950 border-t-2 border-b-2 border-x-0 border-solid border-bright-sun-600 ${sticking ? 'fixed top-0 w-full z-10 ' : ' '}`}>
      {/* Nav start */}
      <ul className='flex h-[55px] items-center pl-[2%]'>
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
      <ul className='flex items-center pr-7'>
        <li className='mx-5'>
          <Link
            to='/login'
            className='hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
            <BsFillPersonFill className='h-[30px] w-[30px]' />
          </Link>
        </li>

        <li className='mx-5'>
          <a
            href='/'
            className='hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
            <BsCartFill className='h-[25px] w-[25px]' />
          </a>
        </li>
        <li>
          {showLogout && (
            <FiLogOut
              onClick={logout}
              className='h-[25px] w-[25px] hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'
            />
          )}
        </li>
      </ul>
    </div>
  );
}
export default NavBarDesktop;
