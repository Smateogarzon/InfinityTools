import { useParams } from 'react-router-dom';

function SelectCategory() {
  const { subcategory } = useParams();

  return (
    <div className='min-h-screen w-full flex justify-center mt-5'>
      <div className='w-[55%] flex flex-col items-center'>
        <h1 className='flex w-full'>{subcategory}(20)</h1>
        <div className='flex gap-3 justify-between w-full'>
          <div className='flex w-[22%]'>Hola</div>
          <div className='flex w-[78%]'>Hola</div>
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;
