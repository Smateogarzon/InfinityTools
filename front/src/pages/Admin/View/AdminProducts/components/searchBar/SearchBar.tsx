import { FaSearch } from 'react-icons/fa';
import style from './searchBar.module.css';
import { IFilterAdminProducts } from '../../interface';
function DropdownSearchBar({
  filter,
  setFilter,
}: {
  filter: IFilterAdminProducts;
  setFilter: React.Dispatch<React.SetStateAction<IFilterAdminProducts>>;
}) {
  const handleChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, name: e.target.value });
  };
  return (
    <div className={style.searchBar}>
      <input
        autoComplete='on'
        className='w-full h-[45px] bg-zeus-800 rounded-2xl border-2 border-bright-sun-700 text-zeus-50 px-4 focus:outline-none'
        type='search'
        id='busqueda'
        onChange={handleChageInput}
        placeholder='Busqueda de productos...'
        value={filter.name}
        name='name'
      />
      <FaSearch className='absolute right-[3%] top-[23%] text-bright-sun-600 text-2xl' />
    </div>
  );
}

export default DropdownSearchBar;
