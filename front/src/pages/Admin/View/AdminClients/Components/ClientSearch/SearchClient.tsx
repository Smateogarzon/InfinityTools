import { FaSearch } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import ClientAddWholesale from '../ClientAddWholesale/ClientAddWholesale';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllLocations } from '../../graphql/querys';
import { useQuery } from '@apollo/client';
import { UserGender, UserLocation, UserRol, UserStatus } from '../../interfaces';

function SearchClient({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const navigate = useNavigate();
  const { data } = useQuery(getAllLocations);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const defaultOption = '';
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedOptionStatus, setSelectedOptionStatus] = useState<string>(defaultOption);
  const [selectOptionRegister, setSelectOptionRegister] = useState<string>(defaultOption);
  const [selectOptionRol, setSelectOptionRol] = useState<string>(defaultOption);
  const [selectOptionGender, setSelectOptionGender] = useState<string>(defaultOption);
  const [selectOptionCity, setSelectOptionCity] = useState<string>(defaultOption);
  const [appliedFilters, setAppliedFilters] = useState<string[]>(['']);
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({});
  const [cargado, setCargado] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const params = useLocation();

  // Bloque de código que se ejecuta solo en la carga inicial
  useEffect(() => {
    const setCity = new Set();
    data?.AllLocation?.map((location: UserLocation) => {
      setCity.add(location.city);
    });
    const cityArray = Array.from(setCity) as string[];
    setCities(cityArray);
  }, [data?.AllLocation]);
  if (!cargado) {
    if (params.search !== '') {
      const newUrl = new URLSearchParams(location.search);
      const startSearch: Record<string, string> = {};
      for (const [key, value] of newUrl.entries()) {
        startSearch[key] = decodeURIComponent(decodeURIComponent(value));
      }
      setSearchFilters(startSearch);
      setCargado(true);
      // Establece cargado a true para que este bloque no se ejecute nuevamente
    }
  }

  // Función para manejar las opciones de filtro
  const handleOptionFilter = useCallback(() => {
    if (Object.keys(searchFilters).length !== 0) {
      const currentUrl = new URLSearchParams(location.search);
      const keySearch = Object.keys(searchFilters);
      const values: string[] = [];
      // Recorre las entradas de la URL actual
      /* eslint-disable */
      for (const [key, _] of currentUrl.entries()) {
        /* eslint-enable */
        values.push(key);
      }
      let deleteKey = '';
      // Busca las claves que no están en los filtros y las elimina
      for (const key of keySearch) {
        if (!values.includes(key)) {
          enableSelect(key);
          deleteKey = key;
        }
      }
      // Elimina la clave del filtro
      delete searchFilters[deleteKey];
      setSearchFilters(searchFilters);
    }
  }, [searchFilters, setSearchFilters]);
  // Efecto para manejar la carga inicial y la actualización de filtros
  useEffect(() => {
    const newUrl = new URLSearchParams(location.search);
    // Si la URL está vacía, restablece los filtros y la búsqueda
    if (location.search === '') {
      setAppliedFilters([]);
      setSearchFilters({});
      setSearchValue('');
      enableOptions();
    } else {
      // Recorre las entradas de la URL y agrega los valores válidos a los filtros aplicados
      const values: string[] = [];
      for (const [key, value] of newUrl.entries()) {
        if (decodeURIComponent(decodeURIComponent(value)) !== 'undefined' && key !== 'name') {
          values.push(decodeURIComponent(decodeURIComponent(value)));
        }
      }
      const filteredValues = values.filter((value) => value !== 'undefined');
      setAppliedFilters(filteredValues);
    }
    handleOptionFilter();
  }, [params]);

  // Efecto para actualizar los filtros y la URL cuando cambian los filtros de búsqueda
  useEffect(() => {
    if (Object.keys(searchFilters).length > 0) {
      const newUrl = new URLSearchParams();
      // Agrega los filtros a la URL y los envía
      for (const [key, value] of Object.entries(searchFilters)) {
        newUrl.append(key, encodeURIComponent(value));
      }
      navigate(`?${newUrl.toString()}`);
      let sendFilters = { ...searchFilters };
      // Convierte los valores de los filtros según para el envio a la base de datos
      if (searchFilters.status) {
        searchFilters.status === 'Activo'
          ? (sendFilters.status = UserStatus.ACTIVE)
          : (sendFilters.status = UserStatus.SUSPENDED);
      }
      if (searchFilters.rol) {
        searchFilters.rol === 'Admin'
          ? (sendFilters.rol = UserRol.ADMIN)
          : searchFilters.rol === 'Usuario'
            ? (sendFilters.rol = UserRol.USER)
            : (sendFilters.rol = UserRol.DISTRIBUTOR);
      }
      if (searchFilters.gender) {
        searchFilters.gender === 'Hombre'
          ? (sendFilters.gender = UserGender.MALE)
          : searchFilters.gender === 'Mujer'
            ? (sendFilters.gender = UserGender.FEMALE)
            : (sendFilters.gender = UserGender.OTHER);
      }
      setFilters(sendFilters); // Actualiza los filtros
    }
    // Si no hay filtros y la URL no está vacía, elimina los filtros de la URL
    if (Object.keys(searchFilters).length === 0 && location.search !== '') {
      const newUrl = new URLSearchParams(location.search);
      for (const [key, _] of newUrl.entries()) {
        newUrl.delete(key);
      }
      setFilters({});
      navigate(`?${newUrl.toString()}`);
    }
  }, [searchFilters, navigate]);

  // Funciones para manejar las opciones de filtro
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
  // Función para agregar un filtro
  const addFilter = (filterName: string) => {
    setAppliedFilters([...appliedFilters, filterName]);
  };
  // Función para eliminar un filtro
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
  // Función para habilitar todas las opciones de los selectores
  const enableOptions = () => {
    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
      const options = select.options;
      for (let i = 0; i < options.length; i++) {
        options[i].disabled = false;
      }
    });
  };
  // Función para habilitar las opciones de un selector específico
  const enableSelect = (name: string) => {
    const select = document.querySelector(`select[name="${name}"]`);
    if (select) {
      const options = select.querySelectorAll('option');
      options.forEach((option) => {
        option.disabled = false;
      });
    }
  };
  // Función para deshabilitar una opción de un selector específico
  const disableOption = (select: HTMLSelectElement, selectedValue: string) => {
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value !== selectedValue) {
        options[i].disabled = true;
      }
    }
  };
  // Función para manejar la búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSearchFilters({ ...searchFilters, name: e.target.value.toLowerCase() });
  };
  // Efecto para limpiar los filtros de búsqueda si el valor de búsqueda está vacío
  useEffect(() => {
    if (searchValue === '') {
      let newSearchFilters: Record<string, string> = {};
      for (const key in searchFilters) {
        if (key !== 'name') {
          newSearchFilters[key] = searchFilters[key];
        }
      }
      setSearchFilters(newSearchFilters);
    }
  }, [searchValue]);
  // Función para manejar la opción seleccionada
  const handleOption = (option: string) => {
    setSelectedOption(option);
    if (option === 'Todos') {
      setAppliedFilters([]);
      setSelectedOptionStatus(defaultOption);
      setSelectOptionRegister(defaultOption);
      setSelectOptionRol(defaultOption);
      setSelectOptionGender(defaultOption);
      setSelectOptionCity(defaultOption);
      setSearchValue('');
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
            onChange={handleSearch}
            value={searchValue}
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
              <option value='Otro'>Otro</option>
            </select>
          </div>

          <div>
            <select
              name='city'
              className='cursor-pointer bg-transparent rounded-md p-2 max-w-[110px]'
              value={selectOptionCity}
              onChange={handleOptionCity}>
              <option value='Ciudad' disabled hidden>
                Ciudad
              </option>
              {cities.length > 0 &&
                cities.map((city: string) => (
                  <option key={city} value={city}>
                    {`${city?.charAt(0).toUpperCase()}${city.substring(1)}`}
                  </option>
                ))}
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
