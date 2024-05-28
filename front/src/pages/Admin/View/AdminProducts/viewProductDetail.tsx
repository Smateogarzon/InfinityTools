import PreviewProductDetail from './components/productPrev/prev';
import DetailProduct from './components/products/detailProduct';
import ExtraDetail from './components/products/extraDetail';

function ViewProductDetail() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <PreviewProductDetail />
      <h1 className='font-bold mt-2'>VISTA CLIENTE</h1>
      <DetailProduct />
      <h1 className='font-bold mt-2'>DATOS ADMINISTRADOR</h1>
      <ExtraDetail />
    </div>
  );
}

export default ViewProductDetail;
