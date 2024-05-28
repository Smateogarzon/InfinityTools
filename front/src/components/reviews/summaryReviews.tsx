// import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import { GrNext } from 'react-icons/gr';
import { FaChevronUp } from 'react-icons/fa6';
function SumaryReviews({
  showReviews,
  setShowReviews,
}: {
  showReviews: boolean;
  setShowReviews: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleScrollBack = () => {
    const scrollAmount = 400; // Ajusta esta cantidad según lo necesario
    window.scrollBy({
      top: -scrollAmount,
      left: 0,
      behavior: 'smooth', // Para que el desplazamiento sea suave
    });
  };
  const handleScrollFront = () => {
    setTimeout(() => {
      const scrollAmount = 400; // Ajusta esta cantidad según lo necesario
      window.scrollBy({
        top: scrollAmount,
        left: 0,
        behavior: 'smooth', // Para que el desplazamiento sea suave
      });
    }, 100);
  };
  return (
    <div className='flex justify-between items-center relative'>
      <div className='flex pl-3 pb-1 gap-3'>
        <span className='text-2xl font-semibold'>4.5</span>
        <div
          className='[&>*]:w-5 [&>*]:h-5 cursor-pointer hover:text-bright-sun-600'
          onClick={() => setShowReviews(!showReviews)}>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <span>(1500)</span>
      </div>
      <div className='absolute top-[-70%] right-[3%] z-10'>
        {!showReviews ? (
          <GrNext
            className='w-[45px] h-[45px] cursor-pointer hover:text-bright-sun-600 animate-zoom-in'
            onClick={() => {
              setShowReviews(!showReviews);
              handleScrollFront();
            }}
          />
        ) : (
          <FaChevronUp
            className='w-[45px] h-[45px]  cursor-pointer hover:text-bright-sun-600 animate-zoom-in'
            onClick={() => {
              handleScrollBack();
              setShowReviews(!showReviews);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SumaryReviews;
