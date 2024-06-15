import { RxHamburgerMenu } from 'react-icons/rx';
import { BsCartFill, BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SpanPhone from './spanPhone';
import { useState } from 'react';
import Categories from './categories';
import { useAppSelector } from '../../../../store';
import { Bounce, toast } from 'react-toastify';
/* eslint-disable */
function NavBarPhone({ navRef, showLogout, logout, sticking, data, loading, error }: any) {
  /* eslint-enable */
  const [showMenu, setShowMenu] = useState(false);
  const { rol, idCart, infoCart } = useAppSelector((state) => state.auth);
  const [showCategory, setShowCategory] = useState(false);

  const notify = () =>
    toast.warn('Aun no tienes productos en tu carrito agrega uno', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  const notify2 = () =>
    toast.warn('Para acceder al carrito debes iniciar sesion', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

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
          {showCategory && (
            <Categories
              data={data}
              loading={loading}
              error={error}
              setShowCategory={setShowCategory}
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

          <li className='flex relative mx-5'>
            <Link
              onClick={idCart === '' && rol === '' ? notify2 : idCart === '' ? notify : undefined}
              to={idCart !== '' ? '/cart' : rol === '' ? '/login' : '#'}
              className=' hover:text-bright-sun-400 transition font-semibold flex items-center text-bright-sun-600 visited:text-bright-sun-600'>
              <BsCartFill className='h-[25px] w-[25px]' />
            </Link>
            {idCart !== '' && (
              <span
                className='absolute -top-2 right-5 text-sm font-bold rounded-full bg-bright-sun-400 text-zeus-950 min-w-[25px]
            min-h-[25px] flex justify-center items-center'>
                {infoCart.totalItems}
              </span>
            )}
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
