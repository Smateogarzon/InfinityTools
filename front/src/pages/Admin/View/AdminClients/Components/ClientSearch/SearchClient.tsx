import { FaSearch } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import ClientAddWholesale from '../ClientAddWholesale/ClientAddWholesale';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function SearchClient() {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<string>('');
  const defaultOption = '';
  const [selectedOptionStatus, setSelectedOptionStatus] = useState<string>(defaultOption);
  const [selectOptionRegister, setSelectOptionRegister] = useState<string>(defaultOption);
  const [selectOptionRol, setSelectOptionRol] = useState<string>(defaultOption);
  const [selectOptionGender, setSelectOptionGender] = useState<string>(defaultOption);
  const [selectOptionCity, setSelectOptionCity] = useState<string>(defaultOption);
  const [appliedFilters, setAppliedFilters] = useState<string[]>(['']);
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({});
  const params = useLocation();

  const handleOptionFilter = useCallback(() => {
    if (Object.keys(searchFilters).length === 0) {
      const newUrl = new URLSearchParams(location.search);
      const startSearch: Record<string, string> = {};
      if (Object.keys(searchFilters).length === 0) {
        for (const [key, value] of newUrl.entries()) {
          startSearch[key] = decodeURIComponent(decodeURIComponent(value));
        }
      }
      setSearchFilters(startSearch);
    } else {
      const currentUrl = new URLSearchParams(location.search);
      const keySearch = Object.keys(searchFilters);
      const values: string[] = [];
      /* eslint-disable */
      for (const [key, _] of currentUrl.entries()) {
        /* eslint-enable */
        values.push(key);
      }
      let deleteKey = '';
      for (const key of keySearch) {
        if (!values.includes(key)) {
          enableSelect(key);
          deleteKey = key;
        }
      }
      delete searchFilters[deleteKey];
      setSearchFilters(searchFilters);
    }
  }, [searchFilters, setSearchFilters]);

  useEffect(() => {
    const newUrl = new URLSearchParams(location.search);
    if (location.search === '') {
      setAppliedFilters([]);
      setSearchFilters({});
      enableOptions();
    }
    const values: string[] = [];
    /* eslint-disable */
    for (const [_, value] of newUrl.entries()) {
      /* eslint-enable */
      if (decodeURIComponent(decodeURIComponent(value)) !== 'undefined') {
        values.push(decodeURIComponent(decodeURIComponent(value)));
      }
    }
    const filteredValues = values.filter((value) => value !== 'undefined');

    setAppliedFilters(filteredValues);
    handleOptionFilter();
  }, [params, handleOptionFilter]);

  useEffect(() => {
    if (Object.keys(searchFilters).length > 0) {
      const newUrl = new URLSearchParams();
      for (const [key, value] of Object.entries(searchFilters)) {
        newUrl.append(key, encodeURIComponent(value));
      }

      navigate(`?${newUrl.toString()}`);
    }
  }, [searchFilters, navigate]);

  const handleOptionStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!appliedFilters.includes(selectedValue)) {
      setSelectedOptionStatus(selectedValue);
      setSearchFilters({ ...searchFilters, status: selectedValue });
      addFilter(selectedValue);
      disableOption(e.target, selectedValue);
    }
  };
  const handleOptionRegister = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!appliedFilters.includes(selectedValue)) {
      setSelectOptionRegister(selectedValue);
      setSearchFilters({ ...searchFilters, register: selectedValue });
      addFilter(selectedValue);
      disableOption(e.target, selectedValue);
    }
  };
  const handleOptionRol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!appliedFilters.includes(selectedValue)) {
      setSelectOptionRol(selectedValue);
      setSearchFilters({ ...searchFilters, rol: selectedValue });
      addFilter(selectedValue);
      disableOption(e.target, selectedValue);
    }
  };

  const handleOptionGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!appliedFilters.includes(selectedValue)) {
      setSelectOptionGender(selectedValue);
      setSearchFilters({ ...searchFilters, gender: selectedValue });
      addFilter(selectedValue);
      disableOption(e.target, selectedValue);
    }
  };

  const handleOptionCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (!appliedFilters.includes(selectedValue)) {
      setSelectOptionCity(selectedValue);
      setSearchFilters({ ...searchFilters, city: selectedValue });
      addFilter(selectedValue);
      disableOption(e.target, selectedValue);
    }
  };

  const addFilter = (filterName: string) => {
    setAppliedFilters([...appliedFilters, filterName]);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = appliedFilters.filter((_, i) => i !== index);
    const searchFiltersTemp: Record<string, string> = {};
    for (const key in searchFilters) {
      if (searchFilters[key] !== appliedFilters[index]) {
        searchFiltersTemp[key] = decodeURIComponent(decodeURIComponent(searchFilters[key]));
      } else {
        enableSelect(key);
      }
    }

    setSearchFilters(searchFiltersTemp);
    setAppliedFilters(updatedFilters);
  };

  const enableOptions = () => {
    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
      const options = select.options;
      for (let i = 0; i < options.length; i++) {
        options[i].disabled = false;
      }
    });
  };
  const enableSelect = (name: string) => {
    const select = document.querySelector(`select[name="${name}"]`);
    if (select) {
      const options = select.querySelectorAll('option');
      options.forEach((option) => {
        option.disabled = false;
      });
    }
  };
  const disableOption = (select: HTMLSelectElement, selectedValue: string) => {
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value !== selectedValue) {
        options[i].disabled = true;
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
      setSearchFilters({});
      const selects = document.querySelectorAll('select');
      selects.forEach((select) => {
        const options = select.options;
        for (let i = 0; i < options.length; i++) {
          options[i].disabled = false;
        }
      });
      navigate('/admin/clients');
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
              name='status'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectedOptionStatus}
              onChange={handleOptionStatus}>
              <option value='' disabled hidden>
                Estado
              </option>
              <option value='Activo'>Activo</option>
              <option value='Suspendido'>Suspendido</option>
            </select>
          </div>
          <div>
            <select
              name='register'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionRegister}
              onChange={handleOptionRegister}>
              <option value='' disabled hidden>
                Registro
              </option>
              <option value='Ascendente'>Ascendente</option>
              <option value='Descendente'>Descendente</option>
            </select>
          </div>
          <div>
            <select
              name='rol'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionRol}
              onChange={handleOptionRol}>
              <option value='' disabled hidden>
                Rol
              </option>
              <option value='Admin'>Administrador</option>
              <option value='Mayorista'>Mayorista</option>
              <option value='Usuario'>Usuario</option>
            </select>
          </div>
          <div>
            <select
              name='gender'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionGender}
              onChange={handleOptionGender}>
              <option value='' disabled hidden>
                Genero
              </option>
              <option value='Hombre'>Hombre</option>
              <option value='Mujer'>Mujer</option>
            </select>
          </div>

          <div>
            <select
              name='city'
              className='cursor-pointer bg-transparent rounded-md p-2'
              value={selectOptionCity}
              onChange={handleOptionCity}>
              <option value='Ciudad' disabled hidden>
                Ciudad
              </option>
              <option value='Ciudad 1'>Ciudad 1</option>
              <option value='Ciudad 2'>Ciudad 2</option>
              <option value='Ciudad 3'>Ciudad 3</option>
            </select>
          </div>
          <ClientAddWholesale />
        </div>
      </div>
      <div className='flex justify-center mt-3' id='appli'>
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
