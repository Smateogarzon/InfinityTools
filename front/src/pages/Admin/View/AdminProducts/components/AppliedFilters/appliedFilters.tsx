import { FaRegTimesCircle } from 'react-icons/fa';

function AppliedFilters() {
  return (
    <div className='flex pt-4 justify-center w-[85%]'>
      <div className='inline-flex items-center px-2 bg-bright-sun-800 rounded-lg'>
        <p>appliedFilters</p>
        <FaRegTimesCircle className='ml-1 text-red-600 hover:text-bright-sun-600 focus:outline-none' />
      </div>
    </div>
  );
}

export default AppliedFilters;
