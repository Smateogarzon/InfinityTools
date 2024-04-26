import { useState } from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { FaRegTimesCircle } from 'react-icons/fa';

function ClientAddWholesale() {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className='flex justify-center items-center mx-auto my-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-bright-sun-800 w-96 h-96 rounded-lg'>
          <div className='flex flex-col justify-center items-start'>
            <FaRegTimesCircle
              className='absolute top-0 right-0 mx-4 my-4 text-zeus-50 text-3xl'
              onClick={closeModal}
            />
            <span className='text-zeus-50 text-3xl font-medium mb-4'>Añadir Mayorista</span>
            <label htmlFor='' className='text-zeus-50 text-2xl '>
              Email
            </label>
            <input
              type='text'
              placeholder='Ingresar email'
              className='w-full h-[30px] rounded-lg bg-zeus-200 p-2 border-none text-zeus-975 text-lg mb-4'
            />
            <label htmlFor='' className='text-zeus-50 text-2xl'>
              Contraseña
            </label>
            <input
              type='text'
              placeholder='Ingresar contraseña'
              className='w-full h-[30px] rounded-lg bg-zeus-200 p-2 border-none text-zeus-975 text-lg'
            />
            <button className='flex justify-center items-center mx-auto mt-5 bg-bright-sun-900 text-zeus-50 text-lg font-normal py-2 px-2 rounded border-none cursor-pointer hover:bg-bright-sun-600'>
              Crear Mayorista
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientAddWholesale;
