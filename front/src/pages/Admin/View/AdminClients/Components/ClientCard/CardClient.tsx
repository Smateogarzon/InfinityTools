import { Link } from 'react-router-dom';
import { UserInfo } from '../../interfaces';

function CardClient({ _id, firtsName, rol, status, picture, date }: UserInfo) {
  return (
    <div
      id='cardClient'
      className='flex flex-row w-[300px] h-[150px] border-solid border-2 border-bright-sun-600 m-[15px]'>
      <div className='overflow-hidden max-w-[100px] flex justify-center items-center'>
        <img
          src={picture}
          alt='Foto Perfil del cliente'
          className='h-[146px] object-contain w-full object-center px-1'
        />
      </div>

      <div
        className='inline-flex flex-col justify-around w-[198px]'
        style={{ borderLeft: '2px solid rgb(255 107 0 )' }}>
        <div className='inline-flex flex-col p-2'>
          <span>{firtsName}</span>
          <span>{status}</span>
          <span>{date?.substring(0, 10)}</span>
          <span>{rol}</span>
        </div>
        <Link to={`/admin/client/detail/${_id}`}>
          <div className='flex justify-center items-center text-zeus-50 bg-bright-sun-600 w-full m-0 h-[32px]'>
            Ver más
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CardClient;
