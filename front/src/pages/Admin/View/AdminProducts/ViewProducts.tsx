import DropdownSearchBar from './components/searchBar/SearchBar';
import Filters from './components/filters/filter.tsx';
import AppliedFilters from './components/AppliedFilters/appliedFilters.tsx';
import Products from './components/products/products.tsx';
import AddProduct from './components/Modals/addProduc.tsx';
import AddCategorys from './components/Modals/addCategories.tsx';
import { useState } from 'react';
import { IFilterAdminProducts } from './interface.ts';

const initialState: IFilterAdminProducts = {
  sellingPrice: '',
  category: '',
  brand: '',
  salesNumber: '',
  name: '',
};

function ViewProducts() {
  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [selectMoldal, setSelectModal] = useState('');
  const [filter, setFilter] = useState<IFilterAdminProducts>(initialState);
  return (
    <div className='flex flex-col items-center justify-center ml-[225px] mt-5  relative'>
      <DropdownSearchBar filter={filter} setFilter={setFilter} />
      <Filters
        filter={filter}
        setFilter={setFilter}
        setAddProduct={setAddProduct}
        addProduct={addProduct}
        setAddCategory={setAddCategory}
        addCategory={addCategory}
        setSelectModal={setSelectModal}
        selectMoldal={selectMoldal}
      />
      <AppliedFilters filter={filter} setFilter={setFilter} />
      <Products />
      {addProduct && <AddProduct setClose={setAddProduct} setSelectModal={setSelectModal} />}
      {addCategory && <AddCategorys setClose={setAddCategory} setSelectModal={setSelectModal} />}
    </div>
  );
}

export default ViewProducts;
