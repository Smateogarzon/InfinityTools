import { IoMdClose } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  createBrand,
  createCategory,
  createSubCategory,
  deleteBrands,
  deleteCategories,
  deleteSubCategories,
  getAllCategories,
  getBrands,
  getSubCategories,
} from '../../graphql/querys';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ICategories } from '../../interface';

function AddCategorys({
  setClose,
  setSelectModal,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const allCategories = useQuery(getAllCategories);
  const allBrands = useQuery(getBrands);
  const [gSubcategories, responseSub] = useLazyQuery(getSubCategories);

  const [cCategory] = useMutation(createCategory);
  const [dCategory] = useMutation(deleteCategories);
  const [cSubCategory] = useMutation(createSubCategory);
  const [dSubCategory] = useMutation(deleteSubCategories);
  const [cBrand] = useMutation(createBrand);
  const [dBrand] = useMutation(deleteBrands);
  const [category, setCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [selectDeleteCategory, setSelectDeleteCategory] = useState<string>('');
  const [nameCategory, setNameCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState(false);
  const [nameSubCategory, setNameSubCategory] = useState<string>('');
  const [selectSubCategory, setSelectSubCategory] = useState<string>('');
  const [brand, setBrand] = useState(false);
  const [addBrand, setAddBrand] = useState(false);
  const [deleteBrand, setDeleteBrand] = useState(false);
  const [selectBrand, setSelectBrand] = useState<string>('');
  const [nameBrand, setNameBrand] = useState<string>('');

  const notifyCategory = (e: Error) =>
    toast.warn(`${e}`.substring(12), {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

  const handleAddCategory = async () => {
    try {
      await cCategory({
        variables: {
          createCategoryInput: { name: nameCategory },
        },
      });
      setNameCategory('');
      setSelectModal('');
      setClose(false);
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const selectCategoryDelete = async (e: React.ChangeEvent<HTMLSelectElement>, set: string) => {
    try {
      const { value } = e.target;
      setSelectDeleteCategory(value);
      if (set === 'subCategorys') {
        await gSubcategories({
          variables: {
            id: value,
          },
          fetchPolicy: 'no-cache',
        });
      }
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const handleDeleteCategory = async () => {
    try {
      await dCategory({
        variables: {
          id: selectDeleteCategory,
        },
      });
      allCategories.refetch();
      setSelectDeleteCategory('');
      setSelectModal('');
      setClose(false);
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const handleAddSubCategory = async () => {
    try {
      await cSubCategory({
        variables: {
          createCategoryInput: { name: nameSubCategory },
          id: selectDeleteCategory,
        },
      });
      setNameSubCategory('');
      setSelectModal('');
      setClose(false);
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const setSelectDeleteSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectSubCategory(value);
  };
  const handleDeleteSubCategory = async () => {
    try {
      await dSubCategory({
        variables: {
          id: selectSubCategory,
          categoryId: selectDeleteCategory,
        },
      });
      await gSubcategories({
        variables: {
          id: selectDeleteCategory,
        },
        fetchPolicy: 'no-cache',
      });
      setSelectSubCategory('');
      setSelectModal('');
      setClose(false);
    } catch (error) {
      notifyCategory(error as Error);
    }
  };

  const delBrand = async () => {
    try {
      await dBrand({
        variables: {
          id: selectBrand,
        },
      });
      setSelectBrand('');
      setSelectModal('');
      setClose(false);
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const handleAddBrand = async () => {
    try {
      await cBrand({
        variables: {
          createBrandInput: { name: nameBrand },
        },
      });
      setNameBrand('');
      setSelectModal('');
      setClose(false);
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
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
            allCategories.refetch();
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
                  onChange={(e) => setNameCategory(e.target.value)}
                  value={nameCategory}
                  id='categorys'
                  type='text'
                  placeholder='Categoría'
                  className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
                />
                <button
                  onClick={handleAddCategory}
                  className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
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
                  onChange={(e) => selectCategoryDelete(e, 'categorys')}
                  name='category'
                  defaultValue={''}
                  id='Deletecategory'
                  className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value='' disabled>
                    Selecciona Categoria
                  </option>
                  {allCategories?.data &&
                    allCategories.data?.allCategories.map((category: ICategories) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {selectDeleteCategory !== '' ? (
                  <IoIosCloseCircleOutline
                    className='text-Red w-[25px] h-[25px] mb-3 cursor-pointer'
                    onClick={handleDeleteCategory}
                  />
                ) : (
                  <div className='w-[25px] h-[25px] mb-3' />
                )}
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
            allCategories.refetch();
            setSelectDeleteCategory('');
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
                  onChange={(e) => selectCategoryDelete(e, 'subCategor')}
                  name='category'
                  id='categorys'
                  defaultValue={''}
                  className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value='' disabled>
                    Selecciona Categoria
                  </option>
                  {allCategories?.data &&
                    allCategories.data?.allCategories.map((category: ICategories) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {selectDeleteCategory !== '' && (
                  <>
                    <label htmlFor='subCategorys'>Añadir subcategoría:</label>
                    <input
                      onChange={(e) => setNameSubCategory(e.target.value)}
                      id='subCategorys'
                      type='text'
                      placeholder='Subcategoría'
                      className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
                    />
                    <button
                      onClick={handleAddSubCategory}
                      className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
                      Añadir
                    </button>
                  </>
                )}
              </div>
            )}
            <h3
              onClick={() => {
                setDeleteSubCategory(!deleteSubCategory);
                setAddSubCategory(false);
                setSelectDeleteCategory('');
              }}
              className='cursor-pointer hover:text-bright-sun-600 mb-2'>
              Elimina una subcategoría
            </h3>
            {deleteSubCategory && (
              <div className='flex flex-col justify-center items-center gap-2 '>
                <label htmlFor='Deletecategory'>Selecciona una Categoría:</label>
                <select
                  onChange={(e) => selectCategoryDelete(e, 'subCategorys')}
                  defaultValue={''}
                  id='Deletecategory'
                  className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value='' disabled>
                    Categorias
                  </option>
                  {allCategories?.data &&
                    allCategories.data?.allCategories.map((category: ICategories) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {selectDeleteCategory !== '' && (
                  <>
                    <label htmlFor='subCategorys'>Selecciona una subcategoría:</label>
                    <select
                      onChange={(e) => setSelectDeleteSubCategory(e)}
                      defaultValue={''}
                      id='subCategorys'
                      className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                      <option value='' disabled>
                        {' '}
                        Subcategorías
                      </option>
                      {responseSub?.data?.allSubcategories.length > 0 &&
                        responseSub.data?.allSubcategories.map((subCategory: ICategories) => (
                          <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.name}
                          </option>
                        ))}
                    </select>
                  </>
                )}
                {selectSubCategory !== '' ? (
                  <IoIosCloseCircleOutline
                    onClick={handleDeleteSubCategory}
                    className='text-Red w-[25px] h-[25px] mb-3 cursor-pointer'
                  />
                ) : (
                  <div className='mb-3 w-[25px] h-[25px]' />
                )}
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
            <h3
              onClick={() => {
                setAddBrand(!addBrand);
                setDeleteBrand(false);
                allBrands.refetch();
              }}
              className='cursor-pointer hover:text-bright-sun-600'>
              Añadir Marca
            </h3>
            {addBrand && (
              <>
                <input
                  onChange={(e) => setNameBrand(e.target.value)}
                  type='text'
                  id='brands'
                  name='brand'
                  className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
                  placeholder='Añade una marca'
                />
                <button
                  onClick={handleAddBrand}
                  className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
                  Añadir
                </button>
              </>
            )}
            <h3
              onClick={() => {
                setDeleteBrand(!deleteBrand);
                setAddBrand(false);
                allBrands.refetch();
              }}
              className='cursor-pointer hover:text-bright-sun-600'>
              Elimina una marca
            </h3>
            {deleteBrand && (
              <>
                <select
                  onChange={(e) => setSelectBrand(e.target.value)}
                  id='brands'
                  name='brand'
                  defaultValue={''}
                  className='w-fit px-1 h-[35px]  bg-bright-sun-100 text-[#fff] cursor-pointer'>
                  <option value='' disabled>
                    Seleccione una marca
                  </option>
                  {allBrands?.data &&
                    allBrands.data?.brands.map((brand: ICategories) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                </select>
                {selectBrand !== '' ? (
                  <IoIosCloseCircleOutline
                    onClick={delBrand}
                    className='text-Red w-[25px] h-[25px] mb-3 cursor-pointer'
                  />
                ) : (
                  <div className='w-[25px] h-[25px] mb-3' />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCategorys;
