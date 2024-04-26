function InfoClientDetail() {
  return (
    <div className='flex mt-5'>
      <ul className='mx-auto'>
        <li>
          <img
            src='https://via.placeholder.com/100'
            alt='Foto de Perfil'
            className='flex justify-center mx-auto h-[150px] w-[150px] object-cover rounded-full my-4'
          />
        </li>
        <li className='flex text-zeus-50 text-2xl'>
          <span className='text-bright-sun-600'> Nombre del cliente: </span>Nombre random
        </li>
        <li className='flex text-zeus-50 text-2xl'>
          <span className='text-bright-sun-600'>Compras realizadas:</span> 12
        </li>
        <li className='flex text-zeus-50 text-2xl'>
          <span className='text-bright-sun-600'>Reseñas:</span> 2
        </li>
        <li className='flex text-zeus-50 text-2xl'>
          <span className='text-bright-sun-600'>Fecha de creacion:</span> 12/03/2024
        </li>
        <li className='flex text-zeus-50 text-2xl'>
          <span className='text-bright-sun-600'>Nombre de Usuario:</span> Nombre random
        </li>
        <li className='flex text-zeus-50 text-2xl'>
          <span className='text-bright-sun-600'>Email:</span> email@gmail.com
        </li>
      </ul>
    </div>
  );
}

export default InfoClientDetail;
