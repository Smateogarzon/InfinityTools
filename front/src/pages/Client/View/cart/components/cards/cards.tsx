import { useEffect, useState } from 'react';
import { IPcart } from '../../interface';
import { MdDeleteForever } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Tooltip, Zoom } from '@mui/material';
import { addProduct, deleteProductCart } from '../../graphql/query';
import { useMutation } from '@apollo/client';
import { Bounce, toast } from 'react-toastify';
import { useAppDispatch } from '../../../../../../store';
import { addItemsCart } from '../../../../../../store/slices/auth.slice';

function Carts({ products }: { products: IPcart }) {
  const [totalProducts, setTotalProducts] = useState(products.infoCarts?.quantity || 1);
  const [dCart] = useMutation(deleteProductCart);
  const [addCart] = useMutation(addProduct);
  const navigate = useNavigate();
  const dispatchAsync = useAppDispatch();
  const notifyError = () =>
    toast.warn('Hubo al eliminar el producto', {
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
  const notifyError2 = () =>
    toast.warn('Hubo al actualizar el producto', {
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
    toast.success('el producto se elimino con exito', {
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
  const deleteProduct = async () => {
    try {
      const { data } = await dCart({ variables: { id: products._id } });
      if (data && data.remove && data.remove.delited === false) {
        dispatchAsync(addItemsCart(data.remove));
        notify();
      } else if (data.remove.delited) {
        dispatchAsync(addItemsCart({ products: [], total: 0, totalItems: 0, _id: '' }));
        notify();
        navigate('/');
      }
    } catch (error) {
      notifyError();
    }
  };
  /* eslint-disable */
  const handleIpdate = async () => {
    try {
      if (totalProducts < 1) {
        setTotalProducts(1);
      }
      const { data } = await addCart({
        variables: {
          createShoppingCartInput: { idProduct: products._id, quantity: totalProducts },
        },
      });
      if (data && data.updateProductToCart) {
        dispatchAsync(addItemsCart(data.updateProductToCart));
      }
    } catch (error) {
      notifyError2();
    }
  };
  useEffect(() => {
    handleIpdate();
  }, [totalProducts]);
  /* eslint-enable */
  return (
    <div className='max-h-[180px] mb:max-h-[115px] w-full flex justify-center'>
      <div className='w-full md:w-[90%]  bg-[#211e1a82] mt-4 flex rounded gap-2 md:gap-5 items-center py-2'>
        <Link to={`/detail/${products._id}`} className='text-zeus-50'>
          <div className='overflow-hidden flex items-center ml-2 md:min-w-[120px]'>
            <img
              src={products.picture}
              alt={products.name}
              className='w-[80px] xs:w-[100px] md:w-[120px] h-[80px] xs:h-[100px] rounded '
            />
          </div>
        </Link>
        <div className=' flex w-full flex-col gap-2 relative'>
          <h3 className='text-base md:text-lg'>{products.brand?.name.toLocaleUpperCase()}</h3>
          <p className='text-sm pr-2'>{products.name}</p>
          <div className='flex flex-col gap-1 lgm:flex-row '>
            <div className='flex  gap-1 items-center'>
              <button
                className='cursor-pointer w-4 h-5 md:h-fit md:w-fit px-2 text-lg md:text-base justify-center text-bold bg-Red flex items-center rounded-lg'
                onClick={() => {
                  totalProducts > 1 && setTotalProducts(totalProducts - 1);
                }}>
                -
              </button>
              <input
                type='text'
                className=' w-[50px] text-base text-center bg-zeus-200 rounded'
                onChange={(e) => {
                  setTotalProducts(Number(e.target.value));
                }}
                value={totalProducts}
              />
              <button
                className='cursor-pointer  w-4 h-5 md:h-fit md:w-fit px-2 text-base text-bold bg-blue flex items-center rounded-lg justify-center'
                onClick={() => {
                  setTotalProducts(totalProducts + 1);
                }}>
                +
              </button>
            </div>
            <div className='flex items-start flex-col ml-2'>
              <div className='flex text-sm'>
                <p>Valor unitario:&nbsp;</p>
                <p>
                  {products.infoCarts?.priceProduct.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </p>
              </div>
              <div className='flex'>
                <h3>Total:&nbsp;</h3>
                <p className='text-base lgm:text-lg'>
                  {products.infoCarts?.total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 right-5' onClick={deleteProduct}>
            <Tooltip title='Eliminar' TransitionComponent={Zoom}>
              <IconButton>
                <MdDeleteForever className='text-Red' />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carts;
