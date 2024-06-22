import { useQuery } from '@apollo/client';
import banner from '../../../../assets/banner1.jpg';
import SearchBar from '../SearchBar/SearchBar';
import { findImg } from '../../../Admin/View/AdminBannersPublics/graphql/query';
import { useEffect, useState } from 'react';

export default function SearchBanner() {
  const { data } = useQuery(findImg, {
    variables: {
      search: 'Banner principal Home',
    },
  });
  const [img, setImg] = useState(banner);

  useEffect(() => {
    if (data) setImg(data?.bannerIMG[0]?.picture);
  }, [data]);
  return (
    <div className='h-[170px] flex'>
      <div className='md:bg-[#000000] h-full w-full md:w-[35%] flex flex-col items-center px-4'>
        <img
          className='w-[200px] inline-block mt-[10px] ,md:w-[250px]'
          src='https://storage.googleapis.com/pictures_infinity/logo.png'></img>
        <SearchBar className='w-[80%] mt-[15px] ' />
      </div>

      <img
        src={img}
        className='hidden md:inline bg-bright-sun-600 h-full w-[65%] object-cover object-center'></img>
    </div>
  );
}
