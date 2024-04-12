import SearchBar from '@/components/Searchbar/searchBar';
import Cards from './components/Cards/Cards';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '@/interface/Iapp';

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://crud-products-4ria.onrender.com/products');
      setProducts(data);
    })();
  }, []);

  return (
    <>
      <header className='flex justify-center w-full mt-10'>
        <SearchBar />
      </header>
      <main className='flex justify-center w-full mt-10'>
        {products && <Cards productsMap={products} />}
      </main>
    </>
  );
}

export default App;
