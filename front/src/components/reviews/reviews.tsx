import { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import style from './reviews.module.css';
function Reviews() {
  const [selectReview, setSelectReview] = useState('Todas');
  return (
    <div className='flex shadow-top-gray w-full animate-slide-in-top justify-center flex-col items-center'>
      <article
        className='flex w-[95%] justify-around items-center pt-2  [&>button]:h-[50px] [&>button]:w-[25%] [&>button]:bg-zeus-200 [&>button]:border-none [&>button]:cursor-pointer [&>button]:text-xl [&>button]:font-semibold
      '
        style={{ borderBottom: '2px solid #000000' }}>
        <button
          className={selectReview === 'Todas' ? 'text-bright-sun-600' : ''}
          style={{ borderBottom: selectReview === 'Todas' ? '3px solid #FF8000' : '' }}
          onClick={() => setSelectReview('Todas')}>
          Todas(1500)
        </button>
        <button
          onClick={() => setSelectReview('Positivas')}
          className={selectReview === 'Positivas' ? 'text-bright-sun-600' : ''}
          style={{ borderBottom: selectReview === 'Positivas' ? '3px solid #FF8000' : '' }}>
          Positivas(1300)
        </button>
        <button
          onClick={() => setSelectReview('Negativas')}
          className={selectReview === 'Negativas' ? 'text-bright-sun-600' : ''}
          style={{ borderBottom: selectReview === 'Negativas' ? '3px solid #FF8000' : '' }}>
          Negativas(200)
        </button>
      </article>
      {selectReview === 'Todas' && (
        <section className={style.container}>
          <div className='flex flex-col items-center w-full  bg-zeus-50 p-3  '>
            <div className='flex justify-between w-[90%]'>
              <span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
              <p>Hace 2 meses</p>
            </div>
            <div className='flex w-[90%] items-center gap-4 flex-col'>
              <p className='text-balance'>
                El producto es el tamaño de la. Foto y se que la marca de la soldadora es buena,
                solo la máscara me decepciono
              </p>
              <p className='w-full flex justify-start ml-5 font-bold'>Fernando</p>
            </div>
          </div>
          <div className='flex flex-col items-center w-full  bg-zeus-50 p-3  '>
            <div className='flex justify-between w-[90%]'>
              <span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
              <p>Hace 2 meses</p>
            </div>
            <div className='flex w-[90%] items-center gap-4 flex-col'>
              <p className='text-balance'>
                El producto es el tamaño de la. Foto y se que la marca de la soldadora es buena,
                solo la máscara me decepciono
              </p>
              <p className='w-full flex justify-start ml-5 font-bold'>Fernando</p>
            </div>
          </div>
          <div className='flex flex-col items-center w-full  bg-zeus-50 p-3  '>
            <div className='flex justify-between w-[90%]'>
              <span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
              <p>Hace 2 meses</p>
            </div>
            <div className='flex w-[90%] items-center gap-4 flex-col'>
              <p className='text-balance'>
                El producto es el tamaño de la. Foto y se que la marca de la soldadora es buena,
                solo la máscara me decepciono
              </p>
              <p className='w-full flex justify-start ml-5 font-bold'>Fernando</p>
            </div>
          </div>
          <div className='flex flex-col items-center w-full  bg-zeus-50 p-3  '>
            <div className='flex justify-between w-[90%]'>
              <span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
              <p>Hace 2 meses</p>
            </div>
            <div className='flex w-[90%] items-center gap-4 flex-col'>
              <p className='text-balance'>
                El producto es el tamaño de la. Foto y se que la marca de la soldadora es buena,
                solo la máscara me decepciono
              </p>
              <p className='w-full flex justify-start ml-5 font-bold'>Fernando</p>
            </div>
          </div>
          <div className='flex flex-col items-center w-full  bg-zeus-50 p-3  '>
            <div className='flex justify-between w-[90%]'>
              <span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
              <p>Hace 2 meses</p>
            </div>
            <div className='flex w-[90%] items-center gap-4 flex-col'>
              <p className='text-balance'>
                El producto es el tamaño de la. Foto y se que la marca de la soldadora es buena,
                solo la máscara me decepciono
              </p>
              <p className='w-full flex justify-start ml-5 font-bold'>Fernando</p>
            </div>
          </div>
        </section>
      )}
      {selectReview === 'Positivas' && (
        <section className={style.container}>
          <div className='flex flex-col items-center w-full  bg-zeus-50 p-3  '>
            <div className='flex justify-between w-[90%]'>
              <span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <CiStar />
              </span>
              <p>Hace 2 meses</p>
            </div>
            <div className='flex w-[90%] items-center gap-4 flex-col'>
              <p className='text-balance'>
                El producto es el tamaño de la. Foto y se que la marca de la soldadora es buena,
                solo la máscara me decepciono
              </p>
              <p className='w-full flex justify-start ml-5 font-bold'>Fernando</p>
            </div>
          </div>
        </section>
      )}
      {selectReview === 'Negativas' && (
        <section className={style.container}>
          <div className='flex flex-col items-center w-full  bg-zeus-50 p-3  '>
            <div className='flex justify-between w-[90%]'>
              <span>
                <FaStar />
                <FaStarHalfAlt />
                <CiStar />
                <CiStar />
                <CiStar />
              </span>
              <p>Hace 2 meses</p>
            </div>
            <div className='flex w-[90%] items-center gap-4 flex-col'>
              <p className='text-balance'>
                El producto es el tamaño de la. Foto y se que la marca de la soldadora es buena,
                solo la máscara me decepciono
              </p>
              <p className='w-full flex justify-start ml-5 font-bold'>Fernando</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Reviews;
