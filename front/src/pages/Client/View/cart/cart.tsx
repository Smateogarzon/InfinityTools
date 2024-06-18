import { useLazyQuery } from '@apollo/client';
import { useAppSelector } from '../../../../store';
import { getProductsCart } from './graphql/query';
import { IPcart } from './interface';
import { useEffect, useState } from 'react';
import { IProducts } from '../../../Admin/View/AdminProducts/components/products/interface';
import { Bounce, toast } from 'react-toastify';
import Carts from './components/cards/cards';
import PayMethos from './components/payMethos/payMethos';
import Animation from '../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';

function Cart() {
  const { infoCart } = useAppSelector((state) => state.auth);
  const [getProduct, response] = useLazyQuery(getProductsCart);
  const [state, setState] = useState<IPcart[]>([]);

  const notifyError = () =>
    toast.warn('Hubo un error al cargar el carrito, intenta de nuevo', {
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
  /*eslint-disable*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState([]);
        if (!infoCart.products) return;
        const productsInfo = infoCart.products.map((product: IProducts) => {
          return {
            priceProduct: product.priceProduct,
            quantity: product.quantity,
            total: product.total,
          };
        });
        const ProductIds = infoCart.products.map((product: IProducts) =>
          getProduct({ variables: { id: product.idProduct } })
        );
        const res = (await Promise.all(ProductIds)).map((product) => product?.data?.FindOneproduct);

        const uniqueProducts = new Set();
        const newProducts: IPcart[] = [];

        for (let i = 0; i < res.length; i++) {
          const product = {
            _id: res[i]._id,
            name: res[i].name,
            brand: {
              _id: res[i].brand._id,
              name: res[i].brand.name,
            },
            picture: res[i].picture,
            infoCarts: productsInfo[i],
          };

          if (uniqueProducts.has(product._id)) continue;
          newProducts.push(product);
          uniqueProducts.add(product._id);
        }

        setState(newProducts);
      } catch (error) {
        notifyError();
      }
    };
    fetchData();
  }, [infoCart]);
  /*eslint-enable*/
  return (
    <div className='min-h-[800px] w-full flex justify-center'>
      {response.loading ? (
        <Lottie animationData={Animation} loop={true} style={{ width: '320px', height: '320px' }} />
      ) : (
        <div className='w-full md:w-[80%] bg-Black-full flex flex-col md:flex-row justify-between items-center'>
          <div className='h-full w-full md:w-[85%] md:h-full mb-3'>
            {state.length > 0 &&
              state.map((product) => <Carts key={product._id} products={product} />)}
          </div>

          <div className='h-[2px] w-full md:h-full md:w-[2px] bg-bright-sun-100' />
          <PayMethos products={infoCart.total} />
          <div className='h-[2px] w-full md:h-full md:w-[3px] bg-bright-sun-100' />
        </div>
      )}
    </div>
  );
}

export default Cart;
