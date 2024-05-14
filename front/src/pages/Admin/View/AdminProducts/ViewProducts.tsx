import DropdownSearchBar from './components/searchBar/SearchBar';
import Filters from './components/filters/filter.tsx';
import AppliedFilters from './components/AppliedFilters/appliedFilters.tsx';
import Products from './components/products/products.tsx';
import AddProduct from './components/Modals/addProduc.tsx';
import AddCategorys from './components/Modals/addCategories.tsx';
import { useState } from 'react';

function ViewProducts() {
  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [selectMoldal, setSelectModal] = useState('');
  return (
    <div className='flex flex-col items-center justify-center ml-[225px] mt-5  relative'>
      <DropdownSearchBar />
      <Filters
        setAddProduct={setAddProduct}
        addProduct={addProduct}
        setAddCategory={setAddCategory}
        addCategory={addCategory}
        setSelectModal={setSelectModal}
        selectMoldal={selectMoldal}
      />
      <AppliedFilters />
      <Products />
      {addProduct && <AddProduct setClose={setAddProduct} setSelectModal={setSelectModal} />}
      {addCategory && <AddCategorys setClose={setAddCategory} setSelectModal={setSelectModal} />}
    </div>
  );
}

export default ViewProducts;
