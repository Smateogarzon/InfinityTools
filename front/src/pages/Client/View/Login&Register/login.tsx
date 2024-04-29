import { useState } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BiShow } from 'react-icons/bi';
import { FaEyeSlash } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { IoArrowBackSharp } from 'react-icons/io5';
import styled from './login.module.css';
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../store';
import { facebookLogin, googleLogin } from '../../../../store/slices/auth.slice';

export default function Login() {
  const theme = createTheme({
    palette: {
      text: {
        primary: '#ffffff',
      },
    },
  });

  const dispatch = useAppDispatch();
  const [stateDistributor, setStateDistributor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const logIn = () => {
    if (!stateDistributor) {
      setStateDistributor(!stateDistributor);
    } else {
      console.log('login');
    }
  };
  const loginWithGoogle = async () => {
    try {
      dispatch(googleLogin());
    } catch (error) {
      console.log(error);
    }
  };
  const loginWithFacebook = () => {
    dispatch(facebookLogin());
  };
  return (
    <ThemeProvider theme={theme}>
      <div className='flex items-center justify-center h-[100vh]  w-[100vw] relative '>
        <img
          src='https://st.depositphotos.com/1008660/5028/i/450/depositphotos_50281265-stock-photo-worker-cutting-metal-with-grinder.jpg'
          alt='fondo'
          className='absolute -z-10 w-full h-full'
        />
        <div className='absolute bg-[#00000070] w-full h-full -z-10'></div>
        <div className={styled.containForm}>
          <div className='flex w-[100%] items-center gap-5'>
            <div className='w-[100%]'>
              {stateDistributor ? (
                <IoArrowBackSharp
                  className='text-5xl justify-left cursor-pointer'
                  onClick={() => setStateDistributor(!stateDistributor)}
                />
              ) : (
                <Link to='/' className='decoration-none' style={{ color: 'white' }}>
                  <FaHome className='text-3xl justify-left cursor-pointer' />
                </Link>
              )}
              <h1
                className={`text-2xl xsm:text-3xl xss:text-4xl w-[100%] ${!stateDistributor && 'pt-2'}`}>
                Log In
              </h1>
            </div>
            <img
              src='https://storage.googleapis.com/pictures_infinity/logo.png'
              alt='logo'
              className={` ${!stateDistributor ? 'w-[130px] xsm:w-[150px] xss:w-[200px]' : 'w-[130px] h-[60px]xs:w-[150px] xss:w-[200px]'}`}
            />
          </div>
          {!stateDistributor && (
            <>
              <h3 className='text-center'>Iniciar Sesión con Facebook o Google</h3>
              <div className='flex gap-8'>
                <FaFacebookSquare
                  className='text-5xl text-[#3b5998] brightness-[150%] hover:cursor-pointer'
                  onClick={loginWithFacebook}
                />
                <FcGoogle className='text-5xl hover:cursor-pointer' onClick={loginWithGoogle} />
              </div>
            </>
          )}
          {stateDistributor && (
            <div className='flex flex-col w-[100%] gap-3'>
              <h3>Correo Electronico</h3>
              <TextField
                id='emailLogin'
                label='Email'
                variant='standard'
                type='email'
                color='warning'
                sx={{ bgcolor: '#5D5D5D', width: '100%', color: 'text.primary' }}
              />
              <h3>Contraseña</h3>
              <div className='relative flex flex-col'>
                <TextField
                  id='passwpordLogin'
                  label='Contraseña'
                  variant='standard'
                  type={showPassword ? 'text' : 'password'}
                  color='warning' // Set the color here
                  sx={{ bgcolor: '#5D5D5D', width: '100%', color: 'text.primary' }}
                />
                {showPassword ? (
                  <BiShow
                    onClick={handleClickShowPassword}
                    className='absolute top-[25%] right-3 text-bright-sun-600 text-2xl hover:bg-bright-sun-950 rounded-full '
                  />
                ) : (
                  <FaEyeSlash
                    onClick={handleClickShowPassword}
                    className='absolute top-[25%] right-3 text-bright-sun-600 text-2xl  hover:bg-bright-sun-950 rounded-full'
                  />
                )}
              </div>
            </div>
          )}
          <button onClick={() => logIn()} className={styled.buttom}>
            <span> </span>
            <span> </span>
            <span> </span>
            <span> </span>
            {!stateDistributor ? 'Inicia sesion como distribuidor' : 'Entrar'}
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}
