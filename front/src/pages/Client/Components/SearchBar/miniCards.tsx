import { useNavigate } from 'react-router-dom';

function MiniCards({
  data,
  setName,
}: {
  data: any; // eslint-disable-line
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    setName('');
    navigate(`/detail/${data._id}`);
  };
  return (
    <div
      className='flex items-center w-full cursor-pointer hover:bg-bright-sun-700'
      onClick={handleClick}>
      <div>
        <img
          src={data.picture}
          alt='img'
          className='w-[50px] h-[50px] smm:w-[70px] smm:h-[70px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[70px] xl:h-[70px] rounded p-1'
        />
      </div>
      <p className='pl-2 text-base lg:text-lg'>{data.name}</p>
    </div>
  );
}

export default MiniCards;
