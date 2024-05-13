import { IoMdClose } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';

function AddCategorys({
  setClose,
  setSelectModal,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [category, setCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState(false);
  const [brand, setBrand] = useState(false);

  return (
    <div className='flex  flex-col absolute z-10 top-[25%] left-[30%] max-h-[500px]  w-[40%] bg-[#000000] p-5 rounded-xl'>
      <IoMdClose
        className='cursor-pointer absolute right-[5%] top-[5%] text-bright-sun-600 text-3xl'
        onClick={() => {
          setClose(false);
          setSelectModal('');
        }}
      />
      <div className='flex justify-center items-center flex-col mt-3'>
        <button
          onClick={() => {
            setCategory(!category);
            setSubCategory(false);
            setBrand(false);
          }}
          type='submit'
          className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
          Añadir Categoria
        </button>
        {category && (
          <div className='mt-[-15px] flex flex-col justify-center items-center animate-slide-out-bottom gap-3'>
            <h1 className='text-bright-sun-600'>Categorías</h1>
            <h3
              onClick={() => {
                setAddCategory(!addCategory);
                setDeleteCategory(false);
              }}
              className='cursor-pointer hover:text-bright-sun-600'>
              Crea una nueva categoría
            </h3>
            {addCategory && (
              <div className='flex flex-col justify-center items-center gap-2'>
                <label htmlFor='categorys'>Añadir categoría:</label>
                <input
                  id='categorys'
                  type='text'
                  placeholder='Categoría'
                  className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
                />
                <button className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
                  Añadir
                </button>
              </div>
            )}
            <h3
              onClick={() => {
                setDeleteCategory(!deleteCategory);
                setAddCategory(false);
              }}
              className='cursor-pointer hover:text-bright-sun-600 mb-2'>
              Elimina una categoría
            </h3>
            {deleteCategory && (
              <div className='flex flex-col justify-center items-center gap-2 '>
                <label htmlFor='Deletecategory'>Elimina una categoría:</label>
                <select
                  name='category'
                  id='Deletecategory'
                  className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value=''>Selecciona Categoria</option>
                </select>
                <IoIosCloseCircleOutline className='text-Red w-[25px] h-[25px] mb-3 cursor-pointer' />
              </div>
            )}
          </div>
        )}
      </div>
      <div className='flex justify-center items-center flex-col mt-3 gap-3'>
        <button
          onClick={() => {
            setSubCategory(!subCategory);
            setCategory(false);
            setBrand(false);
          }}
          type='submit'
          className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
          Añadir Subcategoria
        </button>
        {subCategory && (
          <div className='mt-[-15px] flex flex-col justify-center items-center animate-slide-out-bottom gap-2'>
            <h1 className='text-bright-sun-600'>Subcategorías</h1>
            <h3
              onClick={() => {
                setAddSubCategory(!addSubCategory);
                setDeleteSubCategory(false);
              }}
              className='cursor-pointer hover:text-bright-sun-600'>
              Crea una nueva subcategoría
            </h3>
            {addSubCategory && (
              <div className='flex flex-col justify-center items-center gap-2'>
                <label htmlFor='categorys'>Selecciona una categoría:</label>
                <select
                  name='category'
                  id='category'
                  className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value=''>Selecciona Categoria</option>
                </select>
                <label htmlFor='subCategorys'>Añadir subcategoría:</label>
                <input
                  id='subCategorys'
                  type='text'
                  placeholder='Subcategoría'
                  className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
                />
                <button className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
                  Añadir
                </button>
              </div>
            )}
            <h3
              onClick={() => {
                setDeleteSubCategory(!deleteSubCategory);
                setAddSubCategory(false);
              }}
              className='cursor-pointer hover:text-bright-sun-600 mb-2'>
              Elimina una subcategoría
            </h3>
            {deleteSubCategory && (
              <div className='flex flex-col justify-center items-center gap-2 '>
                <label htmlFor='Deletecategory'>Selecciona una Categoría:</label>
                <select className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value=''>Categorias</option>
                </select>
                <label htmlFor='subCategorys'>Selecciona una subcategoría:</label>
                <select className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value=''> Subcategorías</option>
                </select>
                <IoIosCloseCircleOutline className='text-Red w-[25px] h-[25px] mb-3 cursor-pointer' />
              </div>
            )}
          </div>
        )}
      </div>
      <div className='flex justify-center items-center flex-col mt-3'>
        <button
          onClick={() => {
            setBrand(!brand);
            setCategory(false);
            setSubCategory(false);
          }}
          type='submit'
          className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
          Añadir Marca
        </button>
        {brand && (
          <div className='mt-[-15px] flex flex-col justify-center items-center animate-slide-out-bottom gap-2 mb-3'>
            <h1 className='text-bright-sun-600'>Añadir Marca</h1>
            <input
              type='text'
              className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
              placeholder='Añade una marca'
            />
            <button className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
              Añadir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCategorys;
