import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import style from './searchBar.module.css';
function DropdownSearchBar() {
  const [name, setName] = useState('');
  const handleChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div className={style.searchBar}>
      <input
        className='w-full h-[45px] bg-zeus-800 rounded-2xl border-2 border-bright-sun-700 text-zeus-50 px-4 focus:outline-none'
        type='search'
        id='busqueda'
        onChange={handleChageInput}
        placeholder='Busqueda de productos...'
        value={name}
        name='name'
      />
      <FaSearch className='absolute right-[3%] top-[23%] text-bright-sun-600 text-2xl' />
    </div>
  );
}

export default DropdownSearchBar;
