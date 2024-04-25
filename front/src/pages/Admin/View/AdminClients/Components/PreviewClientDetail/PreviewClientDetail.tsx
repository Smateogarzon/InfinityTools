import { IoChevronBackSharp } from 'react-icons/io5';

function PreviewClientDetail() {
  return (
    <div className='flex flex-row w-full h-12 bg-bright-sun-600'>
      <div className='flex justify-center items-center'>
        <IoChevronBackSharp className='flex justify-center items-center text-zeus-50 text-3xl w-16 h-12 hover:bg-bright-sun-700 hover:rounded-full' />
      </div>
      <div className='flex flex-justify-center items-center text-zeus-50 text-xl mx-auto'>
        Detalle del Cliente
      </div>
    </div>
  );
}

export default PreviewClientDetail;
