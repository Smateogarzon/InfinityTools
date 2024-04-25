import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function SearchClient() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div id='searchClient' className='flex justify-center ml-[225px]'>
      <div className='flex flex-col justify-center mx-auto mt-6 w-[900px] h-[120px] bg-zeus-975 p-10 rounded-md border-solid border-[3px] border-Black-full'>
        <div className='relative mb-3'>
          <input
            type='text'
            className='w-[830px] h-[40px] rounded-lg bg-zeus-200 p-5 border-none text-zeus-975 text-xl'
            placeholder='Nombre del cliente'
          />
          <FaSearch className='absolute right-0 top-0 mt-[10px] text-zeus-975 text-xl' />
        </div>
        <div className='flex justify-center items-center space-x-4'>
          <div
            className={`text-zeus-50 cursor-pointer ${selectedOption === 'Todos' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2`}
            onClick={() => handleOptionClick('Todos')}>
            Todos
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Activos' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2 `}
            onClick={() => handleOptionClick('Activos')}>
            Activos
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Suspendidos' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2`}
            onClick={() => handleOptionClick('Suspendidos')}>
            Suspendidos
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Recientes' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2`}
            onClick={() => handleOptionClick('Recientes')}>
            Recientes
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Rol' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2`}
            onClick={() => handleOptionClick('Rol')}>
            Rol
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Genero' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2`}
            onClick={() => handleOptionClick('Genero')}>
            Genero
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Ciudad' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2`}
            onClick={() => handleOptionClick('Ciudad')}>
            Ciudad
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchClient;
