import styled from './products.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { IAllProducts } from '../../interface';
import animationData from '../../../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';
import { useMutation, useQuery } from '@apollo/client';
import { delProduct, getProducts, updateStatus } from '../../graphql/querys';
import { Bounce, toast } from 'react-toastify';
function Products() {
  const response = useQuery(getProducts);
  const [newStatus] = useMutation(updateStatus);
  const [clearProduct] = useMutation(delProduct);
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

  const changeStatus = async (_id: string, status: boolean) => {
    try {
      await newStatus({
        variables: {
          updateProductStatusInput: {
            _id: _id,
            status: status,
          },
        },
      });
      response.refetch();
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const handleDeleteProduct = async (_id: string) => {
    try {
      await clearProduct({
        variables: {
          id: _id,
        },
      });
      response.refetch();
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  return (
    <div className='w-[85%] flex items-center justify-center mt-3 min-h-[500px] max-h-[650px]'>
      <div className={styled.table}>
        {response.loading ? (
          <div>
            <Lottie animationData={animationData} />
          </div>
        ) : response.error === undefined ? (
          <table className='w-[100%] text-center'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {response.data?.allProducts.length > 0 &&
                response.data?.allProducts.map((product: IAllProducts, i: number) => (
                  <tr key={i} className={!product.status ? 'bg-athens-gray-400 text-zeus-100' : ''}>
                    <td>
                      <div className='flex justify-center gap-3 items-center'>
                        <img
                          src={product.picture}
                          alt={product.name}
                          className='w-[50px] h-[50px]'
                        />
                        <p className='h-fit'>{product.name}</p>
                      </div>
                    </td>
                    <td>
                      {product.sellingPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </td>
                    <td>
                      {product.referencePrice === null ? 'Sin descuento' : product.referencePrice}
                    </td>
                    <td>{product.category.name}</td>
                    <td className='w-[300px]'>
                      <div className='flex justify-center gap-x-[25px]'>
                        <div className='flex justify-center w-[85px] gap-1'>
                          <input
                            type='checkbox'
                            id={`checkbox-${i}`}
                            name={`checkbox-${i}`}
                            defaultChecked={!product.status}
                            className={styled.checkboxRound}
                            onChange={() => changeStatus(product._id, !product.status)}
                          />
                          <p>{product.status ? 'Activo' : 'Inactivo'}</p>
                        </div>
                        <MdEdit className='cursor-pointer w-[20px] h-[20px] hover:text-[#3ff63c]' />
                        <MdDeleteForever
                          className='cursor-pointer w-[20px] h-[20px] hover:text-Red'
                          onClick={() => handleDeleteProduct(product._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Hubo un error intente nuevamente</p>
        )}
      </div>
    </div>
  );
}

export default Products;
