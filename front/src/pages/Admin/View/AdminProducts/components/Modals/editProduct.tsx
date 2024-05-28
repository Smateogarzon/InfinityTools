import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { getAllCategories, getBrands, getSubCategories, updateProduct } from '../../graphql/querys';
import styled from './addProduct.module.css';
import { IoMdClose } from 'react-icons/io';
import { ICategories, ICreateProductInput, Idescription } from '../../interface';
import { Bounce, toast } from 'react-toastify';
import animated from '../../../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';

const initialProductState: ICreateProductInput = {
  _id: '',
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
  referencePrice: string | undefined | null;
  category: string;
  subcategory: string;
  brand: string;
};

const initialErrors: Errors = {
  name: '',
  description: '',
  purchasePrice: '',
  sellingPrice: '',
  referencePrice: undefined,
  category: '',
  subcategory: '',
  brand: '',
};
const inicialDescription: Idescription = {
  dimensiones: {
    Alto: undefined,
    Ancho: undefined,
    Capacidad: undefined,
    Largo: undefined,
    Largo_de_la_manguera: undefined,
    Peso: undefined,
    Tamaño: undefined,
  },
  especificaciones: {
    Amperaje: undefined,
    Aspira_líquidos: '',
    Características: '',
    Color: '',
    Consumo: undefined,
    Cantidad_contenida_en_el_empaque: '',
    Garantía_Producto: '',
    Inalambrico: '',
    Incluye: '',
    Material: '',
    Modelo: '',
    País_de_Origen: '',
    Pila: '',
    Potencia: undefined,
    Tipo: '',
    Tipo_de_aspiradora: '',
    Uso_de_Herramienta: '',
    Voltaje: undefined,
  },
};

function EditProduct({
  setClose,
  data,
  refetching,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: any; // eslint-disable-line
  refetching: () => void;
}) {
  const allCategories = useQuery(getAllCategories);
  const [gSubcategories, responseSub] = useLazyQuery(getSubCategories);
  const allBrands = useQuery(getBrands);
  const [uProduct] = useMutation(updateProduct);
  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);
  const [arrayFiles, setArrayFiles] = useState<(File | string)[]>([]);
  const [infoProduct, setInfoProduct] = useState<ICreateProductInput>(initialProductState);
  const [errors, setErrors] = useState<Errors>(initialErrors);
  const [description, setDescription] = useState<Idescription>(inicialDescription);
  const [optionsDimensions, setOptionsDimensions] = useState<string[]>(
    Object.keys(description.dimensiones)
  );
  const [selectedDimension, setSelectedDimension] = useState('');
  const [selectedEspecificaciones, setSelectedEspecificaciones] = useState('');
  const [optionEspecificaciones, setOptionEspecificaciones] = useState<string[]>(
    Object.keys(description.especificaciones)
  );
  const [valDimensions, setValDimensions] = useState<(string | number | undefined)[]>([]);
  const [valEspecificaciones, setValEspecificaciones] = useState<(string | number | undefined)[]>(
    []
  );
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const arrayDimensions = Object.keys(inicialDescription.dimensiones);
  const arrayEspecificaciones = Object.keys(inicialDescription.especificaciones);
  useEffect(() => {
    if (data && data.data && data.data.FindOneproduct) {
      setSelectedFile(data.data.FindOneproduct.picture);
      setArrayFiles(data.data.FindOneproduct.extraPicture);
      /*eslint-disable*/
      setInfoProduct((prev) => ({
        ...prev,
        _id: data.data.FindOneproduct._id,
        name: data.data.FindOneproduct.name,
        purchasePrice: data.data.FindOneproduct.purchasePrice,
        sellingPrice: data.data.FindOneproduct.sellingPrice,
        referencePrice: data.data.FindOneproduct.referencePrice,
        category: data.data.FindOneproduct.category._id,
        subcategory: data.data.FindOneproduct.subcategory._id,
        brand: data.data.FindOneproduct.brand._id,
      }));
      setDescription(JSON.parse(data.data.FindOneproduct.description));

      gSubcategories({
        variables: {
          id: data.data.FindOneproduct.category._id,
        },
        fetchPolicy: 'no-cache',
      });
      setInitialLoading(true);
    }
  }, [data]);
  /*eslint-enable*/
  useEffect(() => {
    allCategories.refetch();
    allBrands.refetch();
  }, [allBrands, allCategories]);

  if (initialLoading) {
    setValDimensions(Object.values(description.dimensiones));
    setValEspecificaciones(Object.values(description.especificaciones));
    setOptionEspecificaciones(Object.keys(description.especificaciones));
    setOptionsDimensions(Object.keys(description.dimensiones));
    setInitialLoading(false);
  }

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
    if (e.target.files) {
      setArrayFiles([...arrayFiles, e.target.files[0]]);
    }
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
      setInfoProduct((prev) => ({ ...prev, subcategory: '' }));
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const validateProduct = (updatedProduct: ICreateProductInput) => {
    const newErrors = { ...initialErrors };

    if (updatedProduct.name && updatedProduct.name.length < 3) {
      newErrors.name = 'El nombre es demasiado corto';
    }

    if (updatedProduct.description && updatedProduct.description.length < 500) {
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
      updatedProduct.referencePrice !== null &&
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
      if (selectedFile instanceof File && selectedFile.size > 1000000) {
        throw new Error(`El archivo ${selectedFile.name} es demasiado grande`);
      }

      if (arrayFiles.length < 3) {
        throw new Error('Algunos campos tienen errores');
      }
      arrayFiles.forEach((file) => {
        if (file instanceof File && file.size > 1000000) {
          throw new Error(`El archivo ${file.name} es demasiado grande`);
        }
      });
      const sendArrayFiles = arrayFiles.filter((file) => file instanceof File);
      const filesCom = arrayFiles.filter((file) => typeof file === 'string');
      if (typeof selectedFile === 'string') {
        if (sendArrayFiles.length === 0) {
          await uProduct({
            variables: {
              updateProductInput: infoProduct,
              filesCompare: filesCom,
            },
          });
        } else {
          await uProduct({
            variables: {
              arrayFiles: sendArrayFiles,
              updateProductInput: infoProduct,
              filesCompare: filesCom,
            },
          });
        }
      } else {
        if (sendArrayFiles.length === 0) {
          await uProduct({
            variables: {
              image: selectedFile,
              updateProductInput: infoProduct,
              filesCompare: filesCom,
            },
          });
        } else {
          await uProduct({
            variables: {
              image: selectedFile,
              filesCompare: filesCom,
              arrayFiles: sendArrayFiles,
              updateProductInput: infoProduct,
            },
          });
        }
      }
      setInfoProduct(initialProductState);
      setErrors(initialErrors);
      setSelectedFile(null);
      setSelectedDimension('');
      setSelectedEspecificaciones('');
      setDescription(inicialDescription);
      refetching();
      setArrayFiles([]);
      setClose(false);
    } catch (error) {
      notifySubmit(error as Error);
    }
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'dimension') {
      setOptionsDimensions([...optionsDimensions, value]);
      setSelectedDimension(value);
    }
    if (name === 'especificaciones') {
      setOptionEspecificaciones([...optionEspecificaciones, value]);
      setSelectedEspecificaciones(value);
    }
  };

  const handleRemove = (selectedValue: string, index: number, name: string) => {
    if (selectedValue === 'dimension') {
      setOptionsDimensions(
        optionsDimensions.filter((_, i) => {
          return i !== index;
        })
      );
      setDescription({
        ...description,
        dimensiones: {
          ...description.dimensiones,
          [name]: '',
        },
      });
    }
    if (selectedValue === 'especificaciones') {
      setOptionEspecificaciones(
        optionEspecificaciones.filter((_, i) => {
          return i !== index;
        })
      );
      setDescription({
        ...description,
        especificaciones: {
          ...description.especificaciones,
          [name]: '',
        },
      });
    }
  };

  useEffect(() => {
    if (optionsDimensions.length === 0) {
      setSelectedDimension('');
    }
    if (optionEspecificaciones.length === 0) {
      setSelectedEspecificaciones('');
    }
  }, [selectedDimension, optionsDimensions, selectedEspecificaciones, optionEspecificaciones]);
  const modifi = () => {
    let sendDescription = { dimensiones: {}, especificaciones: {} };
    for (const [key, value] of Object.entries(description.dimensiones)) {
      if (key === 'Peso' && value !== undefined) {
        sendDescription = {
          ...sendDescription,
          dimensiones: {
            ...sendDescription.dimensiones,
            [key]: Number(value),
          },
        };
      }
      if (value) {
        sendDescription = {
          ...sendDescription,
          dimensiones: {
            ...sendDescription.dimensiones,
            [key]: value,
          },
        };
      }
    }
    for (const [key, value] of Object.entries(description.especificaciones)) {
      if (key === 'Amperaje' || key === 'Voltaje' || key === 'Potencia' || key === 'Consumo') {
        if (value !== undefined) {
          sendDescription = {
            ...sendDescription,
            especificaciones: {
              ...sendDescription.especificaciones,
              [key]: Number(value),
            },
          };
        }
      }
      if (value && value !== '') {
        sendDescription = {
          ...sendDescription,
          especificaciones: {
            ...sendDescription.especificaciones,
            [key]: value,
          },
        };
      }
    }
    return sendDescription;
  };
  const handleEditDescription = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: string,
    index: number
  ) => {
    const { name, value } = e.target;

    if (option === 'dimensiones') {
      if (value === '') {
        handleRemove('dimensiones', index, name);
      }
      const tempVal = [...valDimensions];
      tempVal[index] = value;
      setValDimensions(tempVal);
      const updatedDimensiones = {
        ...description.dimensiones,
        [name]: value,
      };

      setDescription({
        ...description,
        dimensiones: updatedDimensiones,
      });
    }
    if (option === 'especificaciones') {
      if (value === '') {
        handleRemove('especificaciones', index, name);
      }
      const tempVal = [...valEspecificaciones];
      tempVal[index] = value;
      setValEspecificaciones(tempVal);
      const updatedEspecificaciones = {
        ...description.especificaciones,
        [name]: value,
      };

      setDescription({
        ...description,
        especificaciones: updatedEspecificaciones,
      });
    }
  };
  /*eslint-disable */
  useEffect(() => {
    if (infoProduct._id !== '' && infoProduct._id !== undefined) {
      const sendDescription = modifi();
      setInfoProduct({ ...infoProduct, description: JSON.stringify(sendDescription) });
    }
  }, [description]);
  /*eslint-enable */
  return (
    <div className='flex  flex-col absolute z-11 top-[25%] left-[30%] max-h-[500px]  w-[40%] bg-[#000000] p-5 rounded-xl'>
      <IoMdClose
        className='cursor-pointer absolute right-[5%] top-[5%] text-bright-sun-600 text-3xl'
        onClick={() => {
          setClose(false);
        }}
      />
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-bright-sun-600'>Editar producto</h1>
      </div>
      {data.loading === true ? (
        <div className='flex justify-center items-center'>
          <Lottie
            animationData={animated}
            loop={true}
            style={{ width: '150px', height: '250px' }}
          />
        </div>
      ) : (
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
              <img
                src={
                  selectedFile instanceof File
                    ? URL.createObjectURL(selectedFile)
                    : typeof selectedFile === 'string'
                      ? selectedFile
                      : ''
                }
                alt='Image Preview'
                className='w-[100px] h-[100px]'
              />

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
                {arrayFiles.length > 0 &&
                  arrayFiles.map((file, index) => (
                    <div key={index} id='imagePreview'>
                      <img
                        src={
                          file instanceof File
                            ? URL.createObjectURL(file)
                            : typeof file === 'string'
                              ? file
                              : ''
                        }
                        alt='Image Preview'
                        className='w-[100px] h-[100px] cursor-pointer hover:opacity-[0.7]'
                        onClick={() => setArrayFiles(arrayFiles.filter((_, i) => i !== index))}
                      />
                    </div>
                  ))}
              </div>
              {arrayFiles.length < 3 && (
                <p className='text-[#ff0000]'>Deben ser 3 imagenes o mas</p>
              )}
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
              value={infoProduct.name || ''}
              className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
            />
            {errors.name && <p className='text-[#ff0000]'>{errors.name}</p>}
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='description'>Descripción:</label>
            <div className='flex gap-[36px]'>
              <p className='text-sm'>{'Dimensiones->'}</p>
              <select
                name='dimension'
                id='dimension'
                onChange={(e) => handleSelect(e)}
                value={selectedDimension}
                className=' bg-Black-low text-[#fff] cursor-pointer rounded-md'>
                <option value='' disabled>
                  Opciones
                </option>
                {arrayDimensions.map((dimension) => (
                  <option
                    key={dimension}
                    value={dimension}
                    disabled={optionsDimensions.includes(dimension)}>
                    {dimension}
                  </option>
                ))}
              </select>
            </div>
            {optionsDimensions.length > 0 &&
              optionsDimensions.map(
                (dimension, i) =>
                  valDimensions[i] !== '' && (
                    <div key={dimension} className='flex gap-2'>
                      <label htmlFor={`dimension-${i}`}>{dimension}:</label>
                      <input
                        value={valDimensions[i] || ''}
                        onChange={(e) => handleEditDescription(e, 'dimensiones', i)}
                        type='text'
                        name={dimension}
                        id={`dimension-${i}`}
                        className=' text-[#fff] bg-Black-low rounded-md border-solid border-1'
                      />
                      <IoMdClose
                        className='cursor-pointer'
                        onClick={() => handleRemove('dimension', i, dimension)}
                      />
                    </div>
                  )
              )}
            <div className='flex gap-2'>
              <p className='text-sm'>{'Especificaciones->'}</p>
              <select
                name='especificaciones'
                id='especificaciones'
                onChange={(e) => handleSelect(e)}
                value={selectedEspecificaciones}
                className=' bg-Black-low text-[#fff] cursor-pointer rounded-md max-w-[150px]'>
                <option value='' disabled>
                  Opciones
                </option>
                {arrayEspecificaciones.length > 0 &&
                  arrayEspecificaciones.map((especificaciones) => (
                    <option
                      key={especificaciones}
                      value={especificaciones}
                      disabled={optionEspecificaciones.includes(especificaciones)}>
                      {especificaciones}
                    </option>
                  ))}
              </select>
            </div>
            {optionEspecificaciones.length > 0 &&
              optionEspecificaciones.map((especificaciones, i) => (
                <div key={especificaciones} className='flex gap-2'>
                  <label htmlFor={`especificaciones-${i}`} className='max-w-[150px] truncate ...'>
                    {especificaciones}:
                  </label>
                  <input
                    onChange={(e) => handleEditDescription(e, 'especificaciones', i)}
                    type='text'
                    value={valEspecificaciones[i] || ''}
                    name={especificaciones}
                    id={`especificaciones-${i}`}
                    className=' text-[#fff] bg-Black-low rounded-md border-solid border-1'
                  />
                  <IoMdClose
                    className='cursor-pointer'
                    onClick={() => handleRemove('especificaciones', i, especificaciones)}
                  />
                </div>
              ))}
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
              value={infoProduct.purchasePrice || ''}
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
              value={infoProduct.sellingPrice || ''}
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
              value={infoProduct.referencePrice || ''}
              className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1'
            />
            {errors.referencePrice && <p className='text-[#ff0000]'>{errors.referencePrice}</p>}
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex gap-2'>
              <label htmlFor='categories'>Categoria actual :</label>
              <p className='text-Red'>{data.data?.FindOneproduct.category.name}</p>
            </div>
            <select
              name='category'
              onChange={(e) => {
                handleSubCategory(e);
                handleProduct(e);
              }}
              id='categories'
              defaultValue={infoProduct.category || ''}
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
            <div className='flex gap-2'>
              <label htmlFor='subCategories'>Subcategoria actual :</label>
              <p className='text-Red'>{data.data?.FindOneproduct.subcategory.name}</p>
            </div>
            <select
              name='subcategory'
              id='subCategories'
              onChange={(e) => handleProduct(e)}
              disabled={infoProduct.category !== '' ? false : true}
              defaultValue={infoProduct.subcategory}
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
            <div className='flex gap-2'>
              <label htmlFor='marca'>Marca actual :</label>
              <p className='text-Red'>{data.data?.FindOneproduct.brand.name}</p>
            </div>
            <select
              name='brand'
              id='brands'
              onChange={(e) => handleProduct(e)}
              defaultValue={infoProduct.brand}
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
              Actualizar Producto
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditProduct;
