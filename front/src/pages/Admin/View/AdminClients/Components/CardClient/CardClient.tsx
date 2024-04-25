import { Link } from 'react-router-dom';

function CardClient({
  imgClient,
  name,
  status,
  date,
}: {
  imgClient: string;
  name: string;
  status: boolean;
  date: string;
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
      <div>
        <div className='flex flex-col w-[198px]'>
          <span className='pt-4 pl-4'>{name}</span>
          <span className='pl-4'>{status ? 'Activo' : 'Suspendido'}</span>
          <span className='pl-4'>{date}</span>
          <Link to='/admin/client/detail/${id}'>
            <div className='flex justify-center items-center text-zeus-50 bg-bright-sun-600 w-full m-0 mt-[29px] h-[30px]'>
              Ver más
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardClient;
