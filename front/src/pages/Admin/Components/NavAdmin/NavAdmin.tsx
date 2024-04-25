import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavAdmin() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <nav
      className='fixed overflow-y-scroll bg-zeus-975 text-white py-3 w-[225px] h-screen'
      style={{ scrollbarWidth: 'none' }}>
      <ul className='w-[225px]'>
        <li>
          <img
            src='https://via.placeholder.com/100'
            alt='Logo Infinity Tools'
            className='flex justify-center mx-auto mb-4 h-[50px] w-[193px] object-cover'
          />
        </li>
        <li>
          <div className='flex justify-center mx-auto object-cover'>
            <img
              src='https://via.placeholder.com/100'
              alt='Foto de Perfil Admin'
              className='flex justify-center mx-auto h-[100px] w-[100px] object-cover rounded-full'
            />
          </div>
          <div className='flex justify-center mx-auto m-4 text-xl'>Nombre del Admin</div>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Administrar' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Administrar')}>
          <Link to='/admin/statistics' className='pr-[200px] py-2 text-zeus-50'>
            Administrar
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Clientes' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Clientes')}>
          <Link to='/admin/clients' className='pr-[200px] py-2 text-zeus-50'>
            Clientes
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Pedidos' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Pedidos')}>
          <Link to='/admin/orders' className='pr-[200px] py-2 text-zeus-50'>
            Pedidos
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Productos' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Productos')}>
          <Link to='/admin/products' className='pr-[200px] py-2 text-zeus-50'>
            Productos
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Redes' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Redes')}>
          <Link to='/admin/networks' className='pr-[200px] py-2 text-zeus-50'>
            Redes
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Banners Publicitarios' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Banners Publicitarios')}>
          <Link to='/admin/bannersPublics' className='pr-[200px] py-2 text-zeus-50'>
            Banners Publicitarios
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'SEO y Metadatos' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('SEO y Metadatos')}>
          <Link to='/admin/seoAndMetadata' className='pr-[200px] py-2 text-zeus-50'>
            SEO y Metadatos
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Envio de Correos' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Envio de Correos')}>
          <Link to='/admin/mailing' className='w-[200px] pr-[200px] py-2 text-zeus-50'>
            Envio de Correos
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Asociados' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Asociados')}>
          <Link to='/admin/partners' className='pr-[200px] py-2 text-zeus-50'>
            Asociados
          </Link>
        </li>
        <li
          className={`text-zeus-50 cursor-pointer ${selectedOption === 'Banner' ? 'bg-bright-sun-600 py-2 w-full' : ''} py-2 px-4`}
          onClick={() => handleOptionClick('Banner')}>
          <Link to='/admin/banners' className='pr-[200px] py-2 text-zeus-50'>
            Banner
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavAdmin;
