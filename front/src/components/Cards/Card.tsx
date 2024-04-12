import { IProduct } from '@/interface/Iapp';

function card({ products }: { products: IProduct }) {
  return (
    <div className='max-w-[300px] bg-pearl-bush-200 text-tuscany-950 p-4 rounded-md m-2 flex flex-col justify-center items-center'>
      <div className='w-[280px] h-[280px] mb-4 rounded-md'>
        <img
          src={products.image}
          alt={products.name}
          className='w-full h-full object-cover rounded-md'
        />
      </div>
      <div className='text-center'>
        <h3>{products.name}</h3>
        <p>Precio: ${products.price}</p>
      </div>
    </div>
  );
}

export default card;
