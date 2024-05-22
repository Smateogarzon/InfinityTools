import { FaRegTimesCircle } from 'react-icons/fa';
import { IFilterAdminProducts } from '../../interface';

function AppliedFilters({
  filter,
  setFilter,
}: {
  filter: IFilterAdminProducts;
  setFilter: React.Dispatch<React.SetStateAction<IFilterAdminProducts>>;
}) {
  const filteredObject = Object.keys(filter)
    .filter((key) => key !== 'name')
    .reduce((obj, key) => {
      obj[key] = filter[key];
      return obj;
    }, {} as IFilterAdminProducts);

  const values = Object.values(filteredObject);
  const handleClear = (index: number) => {
    const selectVal = document.getElementById(`aplied-${index}`);
    const valueP = selectVal?.textContent;
    for (const key in filter) {
      if (filter[key] === valueP) {
        setFilter({ ...filter, [key]: '' });
      }
    }
  };
  return (
    <div className='flex pt-4 justify-center w-[85%] gap-2'>
      {values.length > 0 &&
        values.map((val, index) =>
          val !== '' ? (
            <div
              key={index}
              id={`aplied-${index}`}
              className='inline-flex items-center px-2 bg-bright-sun-800 rounded-lg cursor-pointer max-w-[200px] '
              onClick={() => handleClear(index)}>
              <p className='truncate flex-grow'>{val}</p>
              <FaRegTimesCircle className='ml-1  hover:text-bright-sun-600  h-[15px] w-[15px] flex-shrink-0' />
            </div>
          ) : null
        )}
    </div>
  );
}

export default AppliedFilters;
