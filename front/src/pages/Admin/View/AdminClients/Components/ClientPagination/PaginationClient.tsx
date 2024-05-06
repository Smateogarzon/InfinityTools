import React, { Fragment, useEffect, useState } from 'react';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';

function PaginationClient({
  total,
  setNumPag,
}: {
  total: number;
  setNumPag: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedPage, setSelectedPage] = useState(1);
  const totalPage = Array.from({ length: total }, (_, i) => i + 1);
  const renderPage = () => {
    const renders = totalPage.map((page, i) => {
      if (i < 5) {
        return (
          <li
            key={page}
            id={`${page}`}
            onClick={() => setSelectedPage(page)}
            style={{
              backgroundColor: page === selectedPage ? '#ff6b0060' : 'transparent',
              cursor: 'pointer',
              paddingInline: '5px',
              paddingTop: '3px',
              height: 'auto',
              borderRadius: '50px',
            }}>
            {page}
          </li>
        );
      } else if (i === 5) {
        return (
          <Fragment key={'ellipsis'}>
            <li
              key={page}
              id='...'
              style={{
                backgroundColor: page === selectedPage ? '#ff6b0060' : 'transparent',
                paddingInline: '5px',
                paddingTop: '3px',
                height: 'auto',
                borderRadius: '50px',
              }}>
              ...
            </li>
            <li
              key={'...'}
              style={{
                opacity: selectedPage > 5 && selectedPage < total ? 1 : 0,
                width: selectedPage > 5 && selectedPage < total ? 'auto' : '0',
              }}>
              ...
            </li>
          </Fragment>
        );
      }
    });
    if (total > 5) {
      renders.push(
        <li
          key={totalPage.length}
          onClick={() => setSelectedPage(total)}
          style={{
            cursor: 'pointer',
            marginInline: '5px',
            backgroundColor: selectedPage === total ? '#ff6b0060' : 'transparent',
            paddingInline: '5px',
            paddingTop: '3px',
            height: 'auto',
            borderRadius: '50px',
          }}>
          {total}
        </li>
      );
    }
    return renders;
  };
  useEffect(() => {
    if (selectedPage === total) {
      const liSelector = document.getElementById('5');
      const liSelector2 = document.getElementById('...');
      if (liSelector && liSelector2) {
        liSelector.innerHTML = '5';
        liSelector2.innerHTML = '...';
      }
    } else if (selectedPage > 5) {
      const liSelector = document.getElementById('5');
      const liSelector2 = document.getElementById('...');
      if (liSelector && liSelector2) {
        liSelector.innerHTML = '...';
        liSelector2.innerHTML = selectedPage.toString();
      }
    } else if (selectedPage <= 5) {
      const liSelector = document.getElementById('5');
      const liSelector2 = document.getElementById('...');
      if (liSelector && liSelector2) {
        liSelector.innerHTML = '5';
        liSelector2.innerHTML = '...';
      }
    }
    setNumPag(selectedPage);
  }, [selectedPage]);
  return (
    <div className='flex flex-wrap justify-center ml-[225px]  gap-3 mt-5'>
      <button
        onClick={() => {
          selectedPage > 1 && setSelectedPage(selectedPage - 1);
        }}
        className='flex items-center justify-center gap-2 text-xl font-medium text-[#FFFFFF] bg-[#00000000] border-none cursor-pointer hover:bg-bright-sun-900 px-1 rounded'>
        <GrPrevious />

        <p>Prev</p>
      </button>
      <ul
        key='pagination'
        id='pagination'
        className='flex items-end justify-center gap-2 text-lg font-medium'>
        {renderPage()}
      </ul>
      <button
        onClick={() => {
          selectedPage < total && setSelectedPage(selectedPage + 1);
        }}
        className='flex items-center justify-center gap-2 text-xl font-medium text-[#FFFFFF] bg-[#00000000] border-none cursor-pointer hover:bg-bright-sun-900 px-1 rounded'>
        <p>Next</p>

        <GrNext />
      </button>
    </div>
  );
}

export default PaginationClient;
