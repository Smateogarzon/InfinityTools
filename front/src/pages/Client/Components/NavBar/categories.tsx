import styled from './acordeon.module.css';
import animare from '../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';
import { TbPointFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
/* eslint-disable */
function Categories({ setShowCategory, data, loading, error }: any) {
  /* eslint-enable */
  return (
    <>
      <div
        onClick={() => setShowCategory(false)}
        className='absolute z-10 top-[105%] left-[-100%] w-[100vw] min-h-[100vh] h-auto bg-zeus-975 smm:left-0'
      />
      <div className='absolute z-20 top-[105%] left-[-100%] w-[55vw] min-h-[100vh] h-auto bg-zeus-100 shadow-xl shadow-zeus-600 animate-duration-300 animate-fade-in-right smm:left-0 smm:w-[60%] smm:top-[103%]'>
        {error !== undefined ? (
          <h1>{error}</h1>
        ) : loading ? (
          <Lottie animationData={animare} loop={true} style={{ width: '100%', height: '100%' }} />
        ) : (
          /* eslint-disable */
          <div className={styled.acordeonContainer}>
            {data &&
              data?.map((category: any, i: number) => (
                <div key={`content${i + 1}`} className={styled.acordein}>
                  <input
                    type='radio'
                    id={`btn-acordeon${i + 1}`}
                    name='acordeon'
                    className={styled.btnAcordeon}
                  />
                  <label htmlFor={`btn-acordeon${i + 1}`}>
                    {toTitleCase(category.nameCategory)}
                  </label>
                  <div className={styled.content}>
                    {category.subcategories.map((subcategory: any, j: number) => (
                      <Link
                        key={`content${i + 1}${j + 1}`}
                        to={`/category/${category.nameCategory}/${subcategory}`}
                        className='no-underline text-zeus-50'>
                        <div className={`flex hover:text-bright-sun-900 `}>
                          <TbPointFilled className='px-1 w-[25px] h-[25px]' />
                          <button
                            onClick={() => {
                              setShowCategory(false);
                            }}
                            className={`text-balance cursor-pointer text-zeus-50 text-md text-start border-none hover:text-bright-sun-500 md:text-base`}
                            style={{ backgroundColor: 'transparent' }}>
                            {toTitleCase(subcategory)}
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          /* eslint-enable */
        )}
      </div>
    </>
  );
}

export default Categories;
