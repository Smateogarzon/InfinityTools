import { TbShoppingCartPlus } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
function Sets() {
  const location = useLocation();
  return (
    <div className='flex justify-center bg-zeus-50 rounded-sm gap-1 w-[90%] xlg:w-[49%] overflow-hidden max-h-[200px]'>
      <div className='flex overflow-hidden pl-2 '>
        <img
          src='https://www.ingcotools.com.uy/imgs/productos/productos31_4202.png'
          alt='prueba'
          className='w-[70px] h-[100px] rounded-xl'
        />
      </div>
      <article className='text-Black-full flex flex-col p-2'>
        <p>Marca</p>
        <h4>Discos de corte X 10</h4>
        <p className='text-2xl font-bold'>$40.000</p>
        {location.pathname === `admin/products/detail/:id` && (
          <span className='flex justify-end pr-4 pb-4'>
            <TbShoppingCartPlus className='w-10 h-10 ' />
          </span>
        )}
      </article>
    </div>
  );
}

export default Sets;
