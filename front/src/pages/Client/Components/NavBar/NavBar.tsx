import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { logOut } from '../../../../store/thukns/auth.thuks';
import NavBarDesktop from './navBarDesktop';
import NavBarPhone from './navBarPhone';

export default function NavBar() {
  const Navigate = useNavigate();
  const dispach = useAppDispatch();
  const { rol } = useAppSelector((state) => state.auth);
  const navRef = useRef(null);
  const [sticking, setSticking] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);
  useEffect(() => {
    if (rol !== '') {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  }, [rol]);
  window.onscroll = function () {
    stickToTop();
  };

  function stickToTop() {
    const stickyPos = 125;
    setSticking(window.scrollY >= stickyPos);
  }

  const logout = async () => {
    await dispach(logOut());
    Navigate('/');
  };
  return (
    <>
      {sticking && <div className='h-[55px]'></div>}
      {width > 600 ? (
        <NavBarDesktop
          navRef={navRef}
          showLogout={showLogout}
          logout={logout}
          sticking={sticking}
        />
      ) : (
        <NavBarPhone navRef={navRef} showLogout={showLogout} logout={logout} sticking={sticking} />
      )}
    </>
  );
}
