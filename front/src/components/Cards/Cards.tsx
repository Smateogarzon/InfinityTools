import { IProduct } from '@/interface/Iapp';
import Card from './Card';

function cards({ productsMap }: { productsMap: IProduct[] }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {productsMap.map((produc) => (
        <Card key={produc._id} products={produc} />
      ))}
    </div>
  );
}

export default cards;
