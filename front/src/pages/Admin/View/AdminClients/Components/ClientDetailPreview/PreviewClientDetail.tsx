import { IoChevronBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function PreviewClientDetail() {
  return (
    <div className='inline-flex items-center w-full h-12 bg-bright-sun-600'>
      <Link to='/admin/clients'>
        <div className='flex justify-center items-center'>
          <IoChevronBackSharp className=' text-zeus-50 w-12 h-12 p-2 hover:bg-bright-sun-700 hover:rounded-sm' />
        </div>
      </Link>
      <div className='flex flex-justify-center items-center text-zeus-50 text-2xl mx-auto translate-x-[-32px]'>
        Detalle del Cliente
      </div>
    </div>
  );
}

export default PreviewClientDetail;
