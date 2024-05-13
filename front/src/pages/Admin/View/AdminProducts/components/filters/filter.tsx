import { FaPlusCircle } from 'react-icons/fa';

function filters({
  setAddProduct,
  addProduct,
  setAddCategory,
  addCategory,
  setSelectModal,
  selectMoldal,
}: {
  setAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: boolean;
  setAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  addCategory: boolean;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
  selectMoldal: string;
}) {
  return (
    <div
      style={{
        borderBottom: '2px solid rgb(255 107 0 )',
      }}
      className='flex py-3 mt-[2.5px] justify-center gap-[3%] w-[100%] bg-Black-low 
    [&>select]:w-fit [&>select]:px-1 [&>select]:h-[35px] [&>select]:text-base 
    *:bg-bright-sun-100 *:text-[#DBDBDB] *:rounded-lg *:cursor-pointer'>
      <button className='w-fit px-2 text-base hover:bg-bright-sun-800'>Reset</button>
      <select
        name='sellingPrice'
        id='sellingPrice'
        defaultValue={'Todos'}
        className='hover:bg-bright-sun-800'>
        <option value='Todos' disabled>
          Precio
        </option>
        <option value='Menor'>Menor</option>
        <option value='Mayor'>Mayor</option>
      </select>
      <select
        name='category'
        id='category'
        defaultValue={'Todas'}
        className='hover:bg-bright-sun-800'>
        <option value='Todas' disabled>
          Categorias
        </option>
      </select>
      <select name='brand' id='brand' defaultValue={'Todas'} className='hover:bg-bright-sun-800'>
        <option value='Todas' disabled>
          Marcas
        </option>
      </select>
      <select
        name='salesNumber'
        id='salesNumber'
        defaultValue={'Todos'}
        className='hover:bg-bright-sun-800'>
        <option value='Todos' disabled>
          Ventas
        </option>
        <option value='Menor'>Menor</option>
        <option value='Mayor'>Mayor</option>
      </select>

      <button
        className='w-fit px-2 text-base hover:bg-bright-sun-800 flex items-center'
        onClick={() => {
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

export default filters;
