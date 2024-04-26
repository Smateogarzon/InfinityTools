import { useState } from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { FaRegTimesCircle } from 'react-icons/fa';
import ImgBg from './assets/carrito fondo2.jpg';
import { MdAddTask } from 'react-icons/md';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

function ClientAddWholesale() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (field: string) => {
    if (field === 'password' && showPassword !== !showPassword) {
      setShowPassword(!showPassword);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className='inline-flex items-center bg-bright-sun-900 text-zeus-50 text-lg font-normal py-2 px-2 rounded border-none cursor-pointer hover:bg-bright-sun-600'
        onClick={openModal}>
        <MdOutlineAddCircleOutline className=' text-zeus-50 text-2xl mr-2' />
        Mayorista
      </button>

      {isOpen && (
        <div
          className='flex justify-center items-center mx-auto my-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-cover bg- rounded-[20px] w-[600px] h-screen border-solid border-2 border-Black-full hover:border-bright-sun-600 hover:border-solid hover:border-2'
          style={{
            backgroundImage: `url(${ImgBg})`,
            backgroundSize: 'cover',
            width: '500px',
            height: 'screen',
            borderRadius: '20px',
            WebkitBackdropFilter: 'blur(3px)',
            backdropFilter: 'blur(3px)',
          }}>
          <div
            className='flex flex-col justify-center items-center w-[400px] h-[400px] bg-zeus-975 rounded-xl '
            style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
            <FaRegTimesCircle
              className='absolute top-0 right-0 mx-4 my-4 text-zeus-50 text-3xl hover:text-bright-sun-600 cursor-pointer'
              onClick={closeModal}
            />
            <span className='text-zeus-975 font-bold text-3xl mb-4'>Añadir Mayorista</span>
            <label htmlFor='' className=' text-zeus-975 text-2xl font-bold'>
              Email
            </label>
            <input
              type='mail'
              placeholder='Ingresar email'
              className='w-[300px] h-[30px] rounded-lg bg-zeus-200 p-2 border-solid border-[1px] border-zeus-975 text-zeus-975 text-lg mb-4 hover:border-bright-sun-600 focus:outline-none focus:ring-0 focus:border-bright-sun-600 focus:border-[2px]'
            />
            <label htmlFor='' className='text-zeus-975 text-2xl font-bold'>
              Contraseña
            </label>
            <div className='relative'>
              <input
                name='password'
                type={showPassword ? 'text' : 'password'}
                maxLength={30}
                placeholder='Ingresar contraseña'
                className='w-[300px] h-[30px] rounded-lg bg-zeus-200 p-2 border-solid border-[1px] border-zeus-975 text-zeus-975 text-lg hover:border-bright-sun-600 focus:outline-none focus:ring-0 focus:border-bright-sun-600 focus:border-[2px]'
              />
              <button
                onClick={() => togglePasswordVisibility('password')}
                style={{ backgroundColor: 'transparent', border: 'none' }}
                className='absolute inset-y-0 right-0 flex items-center justify-center pr-2 text-tuscany-300 text-2xl'
                type='button'>
                {showPassword ? (
                  <RiEyeFill className='text-bright-sun-600 text-lg' />
                ) : (
                  <RiEyeOffFill className='text-bright-sun-600 text-lg' />
                )}
              </button>
            </div>
            <button className='flex justify-center items-center mx-auto mt-5 bg-bright-sun-500 text-zeus-50 text-lg font-normal py-2 px-2 rounded border-none cursor-pointer hover:bg-bright-sun-600'>
              <MdAddTask className=' text-zeus-50 text-2xl mr-2' />
              Crear Mayorista
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientAddWholesale;
