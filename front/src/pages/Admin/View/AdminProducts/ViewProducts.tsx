import DropdownSearchBar from './components/searchBar/SearchBar';
import Filters from './components/filters/filter.tsx';
import AppliedFilters from './components/AppliedFilters/appliedFilters.tsx';
import Products from './components/products/products.tsx';
import AddProduct from './components/Modals/addProduc.tsx';
import AddCategorys from './components/Modals/addCategories.tsx';
import { useEffect, useState } from 'react';
import { IFilterAdminProducts } from './interface.ts';
import { useAppSelector } from '../../../../store';
import { useLazyQuery } from '@apollo/client';
import { getFilterProducts } from './graphql/querys.ts';
interface IProduct {
  [key: string]: any; // eslint-disable-line
}
const initialState: IFilterAdminProducts = {
  sellingPrice: '',
  category: '',
  brand: '',
  salesNumber: '',
  name: '',
};

function ViewProducts() {
  const { ArrayProducts } = useAppSelector((state) => state.filtersUserAdmin) as {
    ArrayProducts: IProduct;
  };
  const [filterPro, response] = useLazyQuery(getFilterProducts);
  const [render, setRender] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [selectMoldal, setSelectModal] = useState('');
  const [filter, setFilter] = useState<IFilterAdminProducts>(initialState);
  /* eslint-disable */
  useEffect(() => {
    if (Object.keys(ArrayProducts).length > 0) {
      filterPro({ variables: { filter: ArrayProducts } });
      setRender(response.data?.FindAllproductsFilter);
    } else {
      setRender([]);
    }
  }, [ArrayProducts, response.data?.FindAllproductsFilter]);
  /* eslint-enable */
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
      <Products data={render} />
      {addProduct && <AddProduct setClose={setAddProduct} setSelectModal={setSelectModal} />}
      {addCategory && <AddCategorys setClose={setAddCategory} setSelectModal={setSelectModal} />}
    </div>
  );
}

export default ViewProducts;
