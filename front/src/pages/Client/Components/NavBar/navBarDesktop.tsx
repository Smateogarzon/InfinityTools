import { useState } from 'react';
import {
  BsCartFill,
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsListUl,
  BsTagFill,
} from 'react-icons/bs';
import { SiGooglemaps } from 'react-icons/si';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Categories from './categories';
import { useAppSelector } from '../../../../store';
/* eslint-disable */
function NavBarDesktop({ navRef, showLogout, logout, sticking, data, loading, error }: any) {
  /* eslint-enable */
  const { rol } = useAppSelector((state) => state.auth);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div
      ref={navRef}
      className={` flex justify-between bg-zeus-950 border-t-2 border-b-2 border-x-0 border-solid border-bright-sun-600 ${sticking ? 'fixed top-0 w-full z-10 ' : ' '}`}>
      {/* Nav start */}
      <div className='flex relative'>
        <ul className='flex h-[55px] items-center pl-[2%]'>
          <li className='mx-5 '>
            <Link
              to='/'
              className='hover:text-bright-sun-400 transition text-base font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600 lgm:text-xl'>
              <BsFillHouseDoorFill className='mr-2' />
              <span className='translate-y-[1px]'>Inicio</span>
            </Link>
          </li>
          <li
            onClick={() => setShowCategory(!showCategory)}
            className='mx-5 hover:text-bright-sun-400 transition text-base font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600 lgm:text-xl'>
            <BsListUl className='mr-2 cursor-pointer' />
            <span className='translate-y-[1px] cursor-pointer'>Categorías</span>
          </li>
          <li className='mx-5 w-[150px] lgm:w-[200px]'>
            <Link
              to='/'
              className='hover:text-bright-sun-400 transition text-base font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600 lgm:text-xl'>
              <BsTagFill />
              <span className='translate-y-[1px] '>Ofertas del día</span>
            </Link>
          </li>
          <li className=' w-[200px] lgm:w-[250px]'>
            <Link
              to='/service_center'
              className='hover:text-bright-sun-400 transition text-base font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600 lgm:text-xl'>
              <SiGooglemaps />
              <span className='translate-y-[1px] '>Centros de servicios</span>
            </Link>
          </li>
        </ul>
        {showCategory && (
          <Categories
            setShowCategory={setShowCategory}
            data={data}
            loading={loading}
            error={error}
          />
        )}
      </div>
      {/* Nav end */}
      <ul className='flex items-center pr-7'>
        <li className='mx-5'>
          <Link
            to={rol === '' ? '/login' : '/profile'}
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
