import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  className: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='relative flex w-full h-[30px] justify-center'>
        <input
          type='text'
          aria-label='buscar'
          className={`bg-athens-gray-50 border-[2px] border-none outline-none hover:bg-athens-gray-200 text-athens-gray-950 p-2 text-lg transition-all rounded-md w-full h-[30px] outline-2 focus:transition-all focus:outline-bright-sun-600 outline-solid outline-[#00000000] ${className}`}
        />
        <FaSearch className='absolute right-[12%] top-[57%] text-bright-sun-600 text-2xl' />
      </div>
    </div>
  );
};

export default SearchBar;
