import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import ClientAddWholesale from '../ClientAddWholesale/ClientAddWholesale';
// import { useSearchParams } from 'react-router-dom';
// import { useEffect } from 'react';

function SearchClient() {
  // let [searchParams, setSearchParams] = useSearchParams();
  // useEffect(() => {
  //   const formData = new FormData();
  //   formData.append('hola', 'yesfdgfd');
  //   formData.append('adios', '5');
  //   setSearchParams((prev) => {
  //     for (const [key, value] of formData.entries()) {
  //       prev.set(key, value.toString()) ;
  //     }
  //     return prev;
  //   });
  //   const keys = Array.from(searchParams.keys());
  //   const keysString = keys.join(', ');
  //   console.log('Query parameter keys:', keysString);
  // }, []);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const defaultOption = '';
  const [selectedOptionStatus, setSelectedOptionStatus] = useState<string>(defaultOption);
  const [selectOptionRegister, setSelectOptionRegister] = useState<string>(defaultOption);
  const [selectOptionRol, setSelectOptionRol] = useState<string>(defaultOption);
  const [selectOptionGender, setSelectOptionGender] = useState<string>(defaultOption);
  const [selectOptionCity, setSelectOptionCity] = useState<string>(defaultOption);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const handleOptionStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log(e.target.name);
    setSelectedOptionStatus(selectedValue);
    addFilter(e.target.value);
    disableOption(e.target, selectedValue);
  };
  const handleOptionRegister = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectOptionRegister(selectedValue);
    addFilter(e.target.value);
    disableOption(e.target, selectedValue);

    if (selectedValue === 'Ascendente' || selectedValue === 'Descendente') {
      setSelectOptionRegister('');
    }
  };
  const handleOptionRol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    setSelectOptionRol(selectedValue);
    addFilter(e.target.value);
    disableOption(e.target, selectedValue);

    if (selectedValue === 'Admin' || selectedValue === 'Mayorista' || selectedValue === 'Usuario') {
      setSelectOptionRol('');
    }
  };
  const handleOptionGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectOptionGender(selectedValue);
    addFilter(e.target.value);
    disableOption(e.target, selectedValue);

    if (selectedValue === 'Hombre' || selectedValue === 'Mujer') {
      setSelectOptionGender('');
    }
  };
  const handleOptionCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectOptionCity(selectedValue);
    addFilter(e.target.value);
    disableOption(e.target, selectedValue);

    if (
      selectedValue === 'Ciudad 1' ||
      selectedValue === 'Ciudad 2' ||
      selectedValue === 'Ciudad 3'
    ) {
      setSelectOptionCity('');
    }
  };

  const addFilter = (filterName: string) => {
    setAppliedFilters([...appliedFilters, filterName]);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = [...appliedFilters];
    updatedFilters.splice(index, 1);
    setAppliedFilters(updatedFilters);
  };

  const disableOption = (select: HTMLSelectElement, selectedValue: string) => {
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === selectedValue) {
        options[i].disabled = true;
        break;
      }
    }
  };

  const handleOption = (option: string) => {
    setSelectedOption(option);
    if (option === 'Todos') {
      setAppliedFilters([]);
      setSelectedOptionStatus(defaultOption);
      setSelectOptionRegister(defaultOption);
      setSelectOptionRol(defaultOption);
      setSelectOptionGender(defaultOption);
      setSelectOptionCity(defaultOption);

      const selects = document.querySelectorAll('select');
      selects.forEach((select) => {
        const options = select.options;
        for (let i = 0; i < options.length; i++) {
          options[i].disabled = false;
        }
      });
    }
  };

  return (
    <div id='searchClient' className='flex flex-col justify-center ml-[225px]'>
      <div className='flex flex-col justify-center mx-auto mt-6 w-[950px] h-[120px] bg-zeus-975 p-10 rounded-md border-solid border-[3px] border-Black-full'>
        <div className='relative mb-3'>
          <input
            type='text'
            className='w-full h-[40px] rounded-lg bg-zeus-200 p-5 border-none text-zeus-975 text-xl'
            placeholder='Nombre del cliente'
          />
          <FaSearch className='absolute right-4 top-0 mt-[10px] text-zeus-975 text-xl' />
        </div>
        <div className='flex justify-between items-center space-x-4'>
          <div
            className={`text-zeus-50 cursor-pointer ${selectedOption === 'Todos' ? 'bg-bright-sun-600 rounded-md p-2' : ''} p-2`}
            onClick={() => handleOption('Todos')}>
            Todos
          </div>
          <div>
            <select
              name='Estado'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectedOptionStatus}
              onChange={handleOptionStatus}>
              <option value='' disabled>
                Estado
              </option>
              <option value='Activo' disabled={selectedOptionStatus !== ''}>
                Activo
              </option>
              <option value='Suspendido' disabled={selectedOptionStatus !== ''}>
                Suspendido
              </option>
            </select>
          </div>
          <div>
            <select
              name='Registro'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionRegister}
              onChange={handleOptionRegister}>
              <option value='' disabled>
                Registro
              </option>
              <option value='Ascendente'>Ascendente</option>
              <option value='Descendente'>Descendente</option>
            </select>
          </div>
          <div>
            <select
              name='Rol'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionRol}
              onChange={handleOptionRol}>
              <option value='' disabled>
                Rol
              </option>
              <option value='Admin'>Administrador</option>
              <option value='Mayorista'>Mayorista</option>
              <option value='Usuario'>Usuario</option>
            </select>
          </div>
          <div>
            <select
              name='Genero'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionGender}
              onChange={handleOptionGender}>
              <option value='' disabled>
                Genero
              </option>
              <option value='Hombre'>Hombre</option>
              <option value='Mujer'>Mujer</option>
            </select>
          </div>

          <div>
            <select
              name='City'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionCity}
              onChange={handleOptionCity}>
              <option value='Ciudad'>Ciudad</option>
              <option value='Ciudad 1'>Ciudad 1</option>
              <option value='Ciudad 2'>Ciudad 2</option>
              <option value='Ciudad 3'>Ciudad 3</option>
            </select>
          </div>
          <ClientAddWholesale />
        </div>
      </div>
      <div className='flex justify-center mt-3'>
        {appliedFilters.map((filter, index) => (
          <div
            key={index}
            className='inline-flex items-center bg-bright-sun-600 border-solid border-[2px] border-Black-full rounded-md px-2 py-1 text-sm  mr-2'>
            <span>{filter}</span>
            <FaRegTimesCircle
              onClick={() => removeFilter(index)}
              className=' ml-2 text-red-600 hover:text-bright-sun-600 focus:outline-none'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchClient;
