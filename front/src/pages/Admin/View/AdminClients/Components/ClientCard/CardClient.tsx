import { Link } from 'react-router-dom';

function CardClient({
  imgClient,
  name,
  status,
  date,
  rol,
}: {
  imgClient: string;
  name: string;
  status: boolean;
  date: string;
  rol: string;
}) {
  return (
    <div
      id='cardClient'
      className='flex flex-row w-[300px] h-[150px] border-solid border-2 border-bright-sun-600 m-[15px]'>
      <div>
        <img
          src={imgClient}
          alt='Foto Perfil del cliente'
          className='w-[100px] h-[146px] object-cover'
        />
      </div>

      <div className='inline-flex flex-col justify-around w-[198px]'>
        <div className='inline-flex flex-col p-2'>
          <span>{name}</span>
          <span>{status ? 'Activo' : 'Suspendido'}</span>
          <span>{date}</span>
          <span>{rol}</span>
        </div>
        <Link to='/admin/client/detail/${id}'>
          <div className='flex justify-center items-center text-zeus-50 bg-bright-sun-600 w-full m-0 h-[32px]'>
            Ver más
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CardClient;
