interface SearchBarProps {
  className: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <input
      type='text'
      aria-label='buscar'
      className={`bg-athens-gray-50 border-[2px] border-none outline-none hover:bg-athens-gray-200 text-athens-gray-950 p-2 text-lg transition rounded-md w-full max-w-[275px] h-[30px] outline-0 focus:outline-2 outline-solid outline-bright-sun-600 ${className}`}></input>
  );
};

export default SearchBar;
