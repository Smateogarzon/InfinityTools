import { FaPlusCircle } from 'react-icons/fa';
import { ICategories, IFilterAdminProducts } from '../../interface';
import { useEffect, useState } from 'react';
import { getAllCategories, getBrands } from '../../graphql/querys';
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { filterProducts } from '../../../../../../store/slices/filterUserAdmin.slice';
const initialState: IFilterAdminProducts = {
  sellingPrice: '',
  category: '',
  brand: '',
  salesNumber: '',
  name: '',
};

interface IProduct {
  [key: string]: any; // eslint-disable-line
}
function Filters({
  setAddProduct,
  addProduct,
  setAddCategory,
  addCategory,
  setSelectModal,
  selectMoldal,
  filter,
  setFilter,
}: {
  setAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: boolean;
  setAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  addCategory: boolean;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
  selectMoldal: string;
  filter: IFilterAdminProducts;
  setFilter: React.Dispatch<React.SetStateAction<IFilterAdminProducts>>;
}) {
  const { ArrayProducts } = useAppSelector((state) => state.filtersUserAdmin) as {
    ArrayProducts: IProduct;
  };
  const allCategories = useQuery(getAllCategories);
  const allBrands = useQuery(getBrands);
  const navigate = useNavigate();
  const params = useLocation();
  const Dispatch = useAppDispatch();
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      const newUrl = new URLSearchParams(location.search);
      const newFilter: IFilterAdminProducts = { ...initialState };

      for (const [key, value] of newUrl.entries()) {
        newFilter[key as keyof IFilterAdminProducts] = decodeURIComponent(value);
      }

      setFilter(newFilter);
      Dispatch(filterProducts(newFilter));
      setInitialLoad(true);
    } else {
      const newUrl = new URLSearchParams(location.search);
      const newFil: IFilterAdminProducts = {};
      for (const [key, value] of newUrl.entries()) {
        newFil[key as keyof IFilterAdminProducts] = decodeURIComponent(value);
      }
      Dispatch(filterProducts(newFil));
    }
  }, [initialLoad, params, setFilter, Dispatch]);

  useEffect(() => {
    if (initialLoad) {
      const newUrl = new URLSearchParams();
      if (Object.keys(ArrayProducts).length > 0) {
        for (const [key, value] of Object.entries(ArrayProducts)) {
          if (value) {
            newUrl.append(key, value);
          }
        }
      }
      navigate(`?${newUrl.toString()}`);
    }
  }, [filter, navigate, initialLoad, ArrayProducts]);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    Dispatch(filterProducts({ ...ArrayProducts, [name]: value }));
  };
  const handleReset = () => {
    Dispatch(filterProducts({}));
    setFilter(initialState);
    navigate('/admin/products', { replace: true });
  };
  return (
    <div
      style={{
        borderBottom: '2px solid rgb(255 107 0 )',
      }}
      className='flex py-3 mt-[2.5px] justify-center gap-[3%] w-[100%] bg-Black-low 
    [&>select]:w-fit [&>select]:px-1 [&>select]:h-[35px] [&>select]:text-base 
    *:bg-bright-sun-100 *:text-[#DBDBDB] *:rounded-lg *:cursor-pointer'>
      <button className='w-fit px-2 text-base hover:bg-bright-sun-800' onClick={handleReset}>
        Reset
      </button>
      <select
        onChange={handleFilter}
        name='sellingPrice'
        id='sellingPrice'
        disabled={Object.prototype.hasOwnProperty.call(ArrayProducts, 'sellingPrice')}
        defaultValue={'Todos'}
        className='max-w-[78px] hover:bg-bright-sun-800'>
        <option value='Todos' disabled>
          Precio
        </option>
        <option value='Menor Precio'>Menor Precio</option>
        <option value='Mayor Precio'>Mayor Precio</option>
      </select>
      <select
        onChange={handleFilter}
        name='category'
        id='category'
        disabled={Object.prototype.hasOwnProperty.call(ArrayProducts, 'category')}
        defaultValue={'Todas'}
        className='max-w-[110px] hover:bg-bright-sun-800'>
        <option value='Todas' disabled>
          Categorias
        </option>
        {allCategories.data &&
          allCategories.data?.allCategories.map((el: ICategories) => (
            <option key={el._id}>{el.name}</option>
          ))}
      </select>
      <select
        disabled={Object.prototype.hasOwnProperty.call(ArrayProducts, 'brand')}
        onChange={handleFilter}
        name='brand'
        id='brand'
        defaultValue={'Todas'}
        className='hover:bg-bright-sun-800'>
        <option value='Todas' disabled>
          Marcas
        </option>
        {allBrands.data &&
          allBrands.data?.brands.map((el: ICategories) => <option key={el._id}>{el.name}</option>)}
      </select>
      <select
        disabled={Object.prototype.hasOwnProperty.call(ArrayProducts, 'salesNumber')}
        onChange={handleFilter}
        name='salesNumber'
        id='salesNumber'
        defaultValue={'Todos'}
        className='max-w-[85px] hover:bg-bright-sun-800'>
        <option value='Todos' disabled>
          Ventas
        </option>
        <option value='Menores Ventas'>Menores Ventas</option>
        <option value='Mayores Ventas'>Mayores Ventas</option>
      </select>

      <button
        className='w-fit px-2 text-base hover:bg-bright-sun-800 flex items-center'
        onClick={() => {
          handleReset();
          setAddProduct(!addProduct);
          setSelectModal(selectMoldal === 'addCategoryBrand' ? '' : 'addCategoryBrand');
        }}
        disabled={selectMoldal === 'addProduct'}>
        <FaPlusCircle className='mr-1' />
        Producto
      </button>

      <button
        className='w-fit px-2 text-base hover:bg-bright-sun-800 flex items-center'
        onClick={() => {
          handleReset();
          setAddCategory(!addCategory);
          setSelectModal(selectMoldal === 'addProduct' ? '' : 'addProduct');
        }}
        disabled={selectMoldal === 'addCategoryBrand'}>
        <FaPlusCircle className='mr-1' />
        Categorias y Marcas
      </button>
    </div>
  );
}

export default Filters;
