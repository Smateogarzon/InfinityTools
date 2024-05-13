import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { createProduct } from '../../graphql/querys';
import { IoMdAddCircleOutline } from 'react-icons/io';
import styled from './addProduct.module.css';
import { IoMdClose } from 'react-icons/io';

function AddProduct({
  setClose,
  setSelectModal,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [addProduct, response] = useMutation(createProduct);
  console.log('🚀 ~ response:', response);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [arrayFiles, setArrayFiles] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFile(e.target.files[0]);
  };
  const handleArrayFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setArrayFiles([...arrayFiles, e.target.files[0]]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile || arrayFiles.length > 0) {
      addProduct({ variables: { image: selectedFile, arrayFiles: arrayFiles } });
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
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-bright-sun-600'>Añadir producto</h1>
      </div>
      <form onSubmit={handleSubmit} className={styled.containerForm}>
        <div>
          <input
            type='file'
            id='imageInput'
            accept='image/*'
            onChange={handleFileChange}
            className='hidden'
          />

          <label
            htmlFor='imageInput'
            className='inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer'>
            Subir imagen
          </label>
          <div id='imagePreview' className='flex justify-center py-4'>
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt='Image Preview'
                className='w-[100px] h-[100px]'
              />
            ) : (
              <IoMdAddCircleOutline className='w-[100px] h-[100px]' />
            )}
          </div>
        </div>
        <div>
          <input
            type='file'
            id='imageInputs'
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
                    <img
                      src={URL.createObjectURL(file)}
                      alt='Image Preview'
                      className='w-[100px] h-[100px] cursor-pointer hover:opacity-[0.7]'
                      onClick={() => setArrayFiles(arrayFiles.filter((_, i) => i !== index))}
                    />
                  </div>
                ))
              ) : (
                <IoMdAddCircleOutline className='w-[100px] h-[100px] ' />
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='name'>Nombre del producto:</label>
          <input
            type='text'
            placeholder='Nombre'
            id='name'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='description'>Descripción:</label>
          <textarea
            placeholder='Descripción'
            id='description'
            className='h-[100px] p-2 box-border  text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='purchasePrice'>Precio de compra:</label>
          <input
            type='text'
            placeholder='Precio de compra'
            id='purchasePrice'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='salePrice'>Precio de venta:</label>
          <input
            type='text'
            placeholder='Precio de venta'
            id='salePrice'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='referencePrice'>Precio de referencia:</label>
          <input
            type='text'
            placeholder='Precio con descuento'
            id='referencePrice'
            className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
          />
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
