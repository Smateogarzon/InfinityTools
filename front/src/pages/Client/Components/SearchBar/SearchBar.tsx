import { getFilterProducts } from '../../../../pages/Admin/View/AdminProducts/graphql/querys';
import { useLazyQuery } from '@apollo/client';
import { FaSearch } from 'react-icons/fa';
import ResultsSearch from './resultsSearch';
import { useCallback, useState } from 'react';

interface SearchBarProps {
  className: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [getProduct, { data: FindAllproductsFilter, loading }] = useLazyQuery(getFilterProducts);
  const [name, setName] = useState('');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setName(value);
      if (value === '') return;
      getProduct({
        variables: {
          filter: {
            name: value,
          },
        },
      });
    },
    [name, getProduct]
  );
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='relative flex w-[75%] h-[30px] justify-center'>
        <input
          value={name}
          onChange={onChange}
          type='text'
          name='search'
          id='search'
          aria-label='buscar'
          className={`bg-athens-gray-50 border-[2px] border-none outline-none hover:bg-athens-gray-200 text-athens-gray-950 p-2 text-lg transition-all rounded-md w-full h-[30px] outline-2 focus:transition-all focus:outline-bright-sun-600 outline-solid outline-[#00000000] ${className}`}
        />
        {name !== '' && (
          <ResultsSearch loading={loading} data={FindAllproductsFilter} setName={setName} />
        )}
        <FaSearch className='absolute right-[4%] top-[57%] text-bright-sun-600 text-2xl' />
      </div>
    </div>
  );
};

export default SearchBar;
