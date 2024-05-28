import { useLazyQuery } from '@apollo/client';
import { getProductById } from '../../graphql/querys';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ExtraDetail() {
  const { id } = useParams();
  const [getProduct, { data }] = useLazyQuery(getProductById);
  useEffect(() => {
    getProduct({ variables: { id: id } });
  }, [getProduct]);
  return (
    <div className='mb-10'>
      <span className='flex gap-2'>
        <h3>Categoria:</h3>
        <p>{data?.FindOneproduct?.category.name}</p>
      </span>
      <span className='flex gap-2'>
        <h3>Sub Categoria:</h3>
        <p>{data?.FindOneproduct?.subcategory.name}</p>
      </span>
      <span className='flex gap-2'>
        <h3>Precio de Compra:</h3>
        <p>
          {data?.FindOneproduct?.purchasePrice.toLocaleString('es-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
      </span>
      <span className='flex gap-2'>
        <h3>Numero de Ventas:</h3>
        <p>{data?.FindOneproduct?.sales || 0}</p>
      </span>
    </div>
  );
}

export default ExtraDetail;
