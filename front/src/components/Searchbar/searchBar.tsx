function SearchBar() {
  return (
    <div className='w-[90%] flex justify-center items-center bg-pearl-bush-200 text-tuscany-950 p-2 md:p-4 space-x-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500'>
      <input
        type='text'
        className='flex items-center justify-between bg-pearl-bush-100 text-[.7em] sm:text-[.9em] md:text-[1em] p-1 sm:p-2 md:p-3 w-full hover:custom-border-2 hover:text-tuscany-600 rounded-lg'
        placeholder='Search for products'
      />
    </div>
  );
}

export default SearchBar;
