import { RxHamburgerMenu } from 'react-icons/rx';
import { BsCartFill, BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SpanPhone from './spanPhone';
import { useState } from 'react';
import Categories from './categories';

function NavBarPhone({ navRef, showLogout, logout, sticking }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  return (
    <div className='navBarPhone'>
      <div
        ref={navRef}
        className={`flex justify-start bg-zeus-950 border-t-2 border-b-2 border-x-0 border-solid border-bright-sun-600 ${sticking ? 'fixed top-0 w-full z-10 ' : ' '}`}>
        {/* Nav start */}
        <div className='flex items-center ml-6 relative'>
          {showMenu ? (
            <SpanPhone setShowMenu={setShowMenu} setShowCategory={setShowCategory} />
          ) : (
            <RxHamburgerMenu
              onClick={() => {
                setShowMenu(true);
                setShowCategory(false);
                window.scrollTo(0, 150);
              }}
              className=' hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600 text-2xl'
            />
          )}
          {showCategory && <Categories setShowCategory={setShowCategory} />}
        </div>
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
    </div>
  );
}

export default NavBarPhone;
