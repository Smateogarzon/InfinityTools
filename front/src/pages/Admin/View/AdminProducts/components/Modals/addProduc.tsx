import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { createProduct, getAllCategories, getBrands, getSubCategories } from '../../graphql/querys';
import { IoMdAddCircleOutline } from 'react-icons/io';
import styled from './addProduct.module.css';
import { IoMdClose } from 'react-icons/io';
import { ICategories, ICreateProductInput } from '../../interface';
import { Bounce, toast } from 'react-toastify';
const initialProductState: ICreateProductInput = {
  name: '',
  description: '',
  purchasePrice: 0,
  sellingPrice: 0,
  referencePrice: undefined,
  category: '',
  subcategory: '',
  brand: '',
};
type Errors = {
  name: string;
  description: string;
  purchasePrice: string;
  sellingPrice: string;
  referencePrice: string | undefined;
  category: string;
  subcategory: string;
  brand: string;
};

const initialErrors: Errors = {
  name: '',
  description: '',
  purchasePrice: '',
  sellingPrice: '',
  referencePrice: '',
  category: '',
  subcategory: '',
  brand: '',
};
type ErrorKeys = keyof Errors;
function AddProduct({
  setClose,
  setSelectModal,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const allCategories = useQuery(getAllCategories);
  const [gSubcategories, responseSub] = useLazyQuery(getSubCategories);
  const allBrands = useQuery(getBrands);
  const [addProduct] = useMutation(createProduct);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [arrayFiles, setArrayFiles] = useState<File[]>([]);
  const [infoProduct, setInfoProduct] = useState<ICreateProductInput>(initialProductState);
  const [errors, setErrors] = useState<Errors>(initialErrors);

  useEffect(() => {
    allCategories.refetch();
    allBrands.refetch();
  }, [allBrands, allCategories]);

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

  const notifySubmit = (e: Error) =>
    toast.warn(`${e}`, {
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFile(e.target.files[0]);
  };
  const handleArrayFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setArrayFiles([...arrayFiles, e.target.files[0]]);
  };

  const handleSubCategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const { value } = e.target;
      await gSubcategories({
        variables: {
          id: value,
        },
        fetchPolicy: 'no-cache',
      });
    } catch (error) {
      notifyCategory(error as Error);
    }
  };

  const validateProduct = (updatedProduct: ICreateProductInput) => {
    const newErrors = { ...initialErrors };

    if (updatedProduct.name && updatedProduct.name.length < 3) {
      newErrors.name = 'El nombre es demasiado corto';
    }

    if (updatedProduct.description && updatedProduct.description.length < 150) {
      newErrors.description = 'La descripción es demasiado corta';
    }

    if (updatedProduct.purchasePrice !== undefined && updatedProduct.purchasePrice < 1) {
      newErrors.purchasePrice = 'El precio de compra tiene que ser mayor que 0';
    }

    if (
      updatedProduct.sellingPrice !== undefined &&
      updatedProduct.purchasePrice !== undefined &&
      updatedProduct.sellingPrice <= updatedProduct.purchasePrice
    ) {
      newErrors.sellingPrice = 'El precio de venta tiene que ser mayor que el precio de compra';
    }

    if (
      updatedProduct.referencePrice !== undefined &&
      updatedProduct.sellingPrice !== undefined &&
      updatedProduct.referencePrice <= updatedProduct.sellingPrice
    ) {
      newErrors.referencePrice =
        'El precio de referencia tiene que ser mayor que el precio de venta';
    }

    setErrors(newErrors);
  };

  const handleProduct = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'referencePrice' || name === 'sellingPrice' || name === 'purchasePrice') {
      const mvalues = Number(value);
      const updatedProduct = { ...infoProduct, [name]: mvalues };

      setInfoProduct(updatedProduct);
      validateProduct(updatedProduct);
    } else {
      const updatedProduct = { ...infoProduct, [name]: value };

      setInfoProduct(updatedProduct);
      validateProduct(updatedProduct);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      (Object.keys(errors) as ErrorKeys[]).forEach((key) => {
        if (errors[key] !== '') {
          throw new Error('Algunos campos tienen errores');
        }
      });
      if (!selectedFile || arrayFiles.length < 3) {
        throw new Error('Algunos campos tienen errores');
      }
      if (selectedFile.size > 1000000) {
        throw new Error(`El archivo ${selectedFile.name} es demasiado grande`);
      }
      const sendArrayFiles = arrayFiles.filter((file) => file !== undefined);
      sendArrayFiles.forEach((file) => {
        if (file.size > 1000000) {
          throw new Error(`El archivo ${file.name} es demasiado grande`);
        }
      });
      await addProduct({
        variables: {
          image: selectedFile,
          arrayFiles: sendArrayFiles,
          createProductInput: infoProduct,
        },
      });
      setInfoProduct(initialProductState);
      setErrors(initialErrors);
      setSelectedFile(null);
      setArrayFiles([]);
      setSelectModal('');
      setClose(false);
    } catch (error) {
      notifySubmit(error as Error);
    }
  };

  return (
    <div className='flex  flex-col absolute z-11 top-[25%] left-[30%] max-h-[500px]  w-[40%] bg-[#000000] p-5 rounded-xl'>
      <IoMdClose
        className='cursor-pointer absolute right-[5%] top-[5%] text-bright-sun-600 text-3xl'
        onClick={() => {
          setClose(false);
          setSelectModal('');
        }}
      />
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-bright-sun-600'>Añadir producto</h1>
      </div>
      <form onSubmit={handleSubmit} className={styled.containerForm} id='form' name='form'>
        <div>
          <input
            type='file'
            id='imageInput'
            name='image'
            accept='image/*'
            onChange={handleFileChange}
            className='hidden'
          />

          <label
            htmlFor='imageInput'
            className='inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer'>
            Subir imagen
          </label>
          <div id='imagePreview' className='flex justify-center flex-col items-center py-4'>
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt='Image Preview'
                className='w-[100px] h-[100px]'
              />
            ) : (
              <IoMdAddCircleOutline className='w-[100px] h-[100px]' />
            )}
            {!selectedFile && (
              <>
                <p className='text-[#ff0000]'>No hay imagen seleccionada</p>
              </>
            )}
          </div>
        </div>
        <div>
          <input
            type='file'
            id='imageInputs'
            name='images'
            accept='image/*'
            onChange={handleArrayFileChange}
            className='hidden'
            multiple
          />
          <label
            htmlFor='imageInputs'
            className='inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer'>
            Subir Imagenes Extra
          </label>
          <div className='flex justify-center flex-col items-center'>
            <div className='flex justify-center flex-wrap gap-x-3 py-3 w-[90%]'>
              {arrayFiles.length > 0 ? (
                arrayFiles.map((file, index) => (
                  <div key={index} id='imagePreview'>
                    {file instanceof File && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt='Image Preview'
                        className='w-[100px] h-[100px] cursor-pointer hover:opacity-[0.7]'
                        onClick={() => setArrayFiles(arrayFiles.filter((_, i) => i !== index))}
                      />
                    )}
                  </div>
                ))
              ) : (
                <IoMdAddCircleOutline className='w-[100px] h-[100px] ' />
              )}
            </div>
            {arrayFiles.length < 3 && <p className='text-[#ff0000]'>Deben ser 3 imagenes o mas</p>}
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='name'>Nombre del producto:</label>
          <input
            onChange={(e) => handleProduct(e)}
            type='text'
            placeholder='Nombre'
            id='name'
            name='name'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
          {errors.name && <p className='text-[#ff0000]'>{errors.name}</p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='description'>Descripción:</label>
          <textarea
            onChange={(e) => handleProduct(e)}
            placeholder='Descripción'
            id='description'
            name='description'
            className='h-[100px] p-2 box-border  text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
          {errors.description && <p className='text-[#ff0000]'>{errors.description}</p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='purchasePrice'>Precio de compra:</label>
          <input
            onChange={(e) => handleProduct(e)}
            type='number'
            placeholder='Precio de compra'
            id='purchasePrice'
            name='purchasePrice'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
          {errors.purchasePrice && <p className='text-[#ff0000]'>{errors.purchasePrice}</p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='salePrice'>Precio de venta:</label>
          <input
            onChange={(e) => handleProduct(e)}
            type='number'
            placeholder='Precio de venta'
            id='salePrice'
            name='sellingPrice'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
          {errors.sellingPrice && <p className='text-[#ff0000]'>{errors.sellingPrice}</p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='referencePrice'>Precio de referencia:</label>
          <input
            onChange={(e) => handleProduct(e)}
            type='number'
            name='referencePrice'
            placeholder='Precio con descuento'
            id='referencePrices'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
          {errors.referencePrice && <p className='text-[#ff0000]'>{errors.referencePrice}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='categories'>Selecciona una categoria:</label>
          <select
            name='category'
            onChange={(e) => {
              handleSubCategory(e);
              handleProduct(e);
            }}
            id='categories'
            defaultValue={''}
            className='h-[35px]   bg-Black-low text-[#fff] cursor-pointer rounded-md'>
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
          <label htmlFor='subCategories'>Seleccione una subcategoria</label>
          <select
            name='subcategory'
            id='subCategories'
            onChange={(e) => handleProduct(e)}
            disabled={infoProduct.category !== '' ? false : true}
            defaultValue={''}
            className='h-[35px]   bg-Black-low text-[#fff] cursor-pointer rounded-md'>
            <option value='' disabled>
              Subcategorias
            </option>
            {responseSub?.data &&
              responseSub.data?.allSubcategories.map((sub: ICategories) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
          </select>
          <label htmlFor='marca'>Seleccione una Marca:</label>
          <select
            name='brand'
            id='brands'
            onChange={(e) => handleProduct(e)}
            defaultValue={''}
            className='h-[35px]   bg-Black-low text-[#fff] cursor-pointer rounded-md'>
            <option value='' disabled>
              Marcas
            </option>
            {allBrands?.data &&
              allBrands.data?.brands.map((brand: ICategories) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex justify-center mt-3'>
          <button
            type='submit'
            className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
            Añadir Producto
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
