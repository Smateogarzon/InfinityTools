import { useEffect, CSSProperties, useState } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
/*eslint-disable*/

function Carousel({ data }: any) {
  const { scrollRef, snapPointIndexes, pages, goTo, activePageIndex, refresh } = useSnapCarousel();
  const [url, setUrl] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const newUrls = data.map((item: any) => item?.picture);
      setUrl(newUrls);
    }
  }, [data, refresh]);

  useEffect(() => {
    if (url.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (activePageIndex + 1) % url.length;
        goTo(nextIndex);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activePageIndex, url, goTo]);
  useEffect(() => {
    if (url.length > 0) {
      refresh();
    }
  }, [url, refresh]);
  const styles: {
    root: CSSProperties;
    scroll: CSSProperties;
    controls: CSSProperties;
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
      height: '100%',
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
    <div className='flex flex-col justify-center items-center relative overflow-hidden h-[200px] md:h-[300px] xl:h-[400px] 2xl:h-[500px]'>
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
}

export default Carousel;
