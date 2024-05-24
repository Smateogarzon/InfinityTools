import styled from './products.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { IAllProducts } from '../../interface';
import animationData from '../../../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { delProduct, getProductById, getProducts, updateStatus } from '../../graphql/querys';
import { Bounce, toast } from 'react-toastify';
import EditProductModal from '../Modals/editProduct';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Products() {
  const [oneProduct, responseP] = useLazyQuery(getProductById);

  const [modalDelete, setModalDelete] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [DeleteProduct, setDeleteProduct] = useState<string[]>([]);

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
  const notify = () =>
    toast.warn('Un producto inactivo no puede ser eliminado ni editado', {
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
  const refetching = () => {
    response.refetch();
  };
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
      setModalDelete(false);
      setDeleteProduct([]);
    } catch (error) {
      notifyCategory(error as Error);
    }
  };
  const handleUpdateProduct = async (_id: string) => {
    try {
      setEditProductModal(true);
      await oneProduct({
        variables: {
          id: _id,
        },
      });
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
                    <td className='cursor-pointer py-2'>
                      <Link to={`/admin/products/detail/${product._id}`} className='text-zeus-50'>
                        <div className='flex justify-around gap-3 items-center'>
                          <img
                            src={product.picture}
                            alt={product.name}
                            className='w-[50px] h-[50px]'
                          />
                          <p className='h-fit'>{product.name}</p>
                        </div>
                      </Link>
                    </td>
                    <td className='cursor-pointer'>
                      {product.sellingPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </td>
                    <td>
                      {product.referencePrice === null
                        ? 'Sin descuento'
                        : (
                            ((product.referencePrice - product.sellingPrice) /
                              product.referencePrice) *
                            100
                          ).toFixed(2) + '%'}
                    </td>
                    <td className='cursor-pointer'>{product?.category?.name}</td>
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
                        <MdEdit
                          className='cursor-pointer w-[20px] h-[20px] hover:text-[#3ff63c]'
                          onClick={() => {
                            if (product.status) {
                              handleUpdateProduct(product._id);
                            } else {
                              notify();
                            }
                          }}
                        />
                        <MdDeleteForever
                          className='cursor-pointer w-[20px] h-[20px] hover:text-Red'
                          onClick={() => {
                            if (product.status) {
                              setDeleteProduct([product._id, product.name]);
                              setModalDelete(true);
                            } else {
                              notify();
                            }
                          }}
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
      <Dialog
        open={modalDelete}
        onClose={() => {
          setModalDelete(false);
          setDeleteProduct([]);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className={styled.modal}
        sx={{
          '& .MuiDialog-paper': { backgroundColor: '#cfcfcf', borderRadius: '10px' }, // Apply styles using sx prop
          '& .MuiDialogTitle-root': { backgroundColor: '#ff9500b5', color: '#000' },
          '& .MuiDialogContent-root': { padding: '20px' },
        }}>
        <DialogTitle className={styled.modalTitle} id='modal-modal-title'>
          Advertencia
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 'bold', color: '#333' }}>
            {`¿Desea eliminar el producto ...${DeleteProduct[1]}...?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModalDelete(false);
              setDeleteProduct([]);
            }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={() => handleDeleteProduct(DeleteProduct[0])}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {editProductModal && (
        <EditProductModal data={responseP} setClose={setEditProductModal} refetching={refetching} />
      )}
    </div>
  );
}

export default Products;
