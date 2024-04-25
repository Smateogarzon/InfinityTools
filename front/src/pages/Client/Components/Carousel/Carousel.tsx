import React, { useEffect, CSSProperties } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

import bannerDos from '../../../../assets/banner2.jpg';
import bannerTres from '../../../../assets/banner3.jpg';
import bannerCuatro from '../../../../assets/banner4.jpg';

const Carousel: React.FC = () => {
  const { scrollRef, snapPointIndexes, pages, goTo, activePageIndex } = useSnapCarousel();

  const url: string[] = [bannerDos, bannerTres, bannerCuatro];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activePageIndex + 1) % url.length;
      goTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [goTo, activePageIndex, url.length]);

  const styles: {
    root: CSSProperties; // Asegúrate de añadir CSSProperties para indicar que es un objeto de estilos
    scroll: CSSProperties; // También aquí
    controls: CSSProperties; // Aquí y en todas las demás propiedades de estilo que sean objetos
    nextPrevButtonDisabled: CSSProperties;
    paginationButton: CSSProperties;
    paginationButtonActive: CSSProperties;
    pageIndicator: CSSProperties;
  } = {
    root: {},
    scroll: {
      position: 'relative',
      display: 'flex',
      scrollBehavior: 'smooth',
      scrollSnapType: 'x mandatory',
      width: '100%',
      height: '250px',
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextPrevButtonDisabled: { opacity: 0.9 },
    paginationButton: {
      display: 'block',
      textIndent: '-99999px',
      overflow: 'hidden',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      margin: '10px 15px',
      transition: 'opacity 200ms ease-out',
      backgroundColor: 'transparent',
    },
    paginationButtonActive: { backgroundColor: '#24282d' },
    pageIndicator: {
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <div className='flex flex-col justify-center items-center relative h-[300px] overflow-hidden'>
      <ul
        style={styles.scroll}
        className='overflow-y-hidden overflow-x-hidden w-full sm:w-[90%] md:w-[80%] h-[150px] relative cursor-pointer'
        ref={scrollRef}>
        {url.map((e, i) => (
          <li
            key={i}
            className='flex-shrink-0 w-full'
            style={{
              scrollSnapAlign: snapPointIndexes.has(i) ? 'start' : '',
            }}>
            <img src={e} alt={`Item ${i}`} className='object-cover w-full h-full' />
          </li>
        ))}
      </ul>
      <div
        className='backdrop-blur-[3px] absolute bottom-0 bg-athens-gray-300 bg-opacity-70 rounded-lg mb-2'
        style={styles.controls}
        aria-hidden>
        {pages.map((_, i) => (
          <button
            key={i}
            className='border-solid border-athens-gray-950 border-[1px]'
            style={{
              ...styles.paginationButton,
              ...(activePageIndex === i ? styles.paginationButtonActive : {}),
            }}
            onClick={() => goTo(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
