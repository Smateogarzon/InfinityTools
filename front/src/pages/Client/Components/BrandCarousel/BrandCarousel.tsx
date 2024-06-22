import React, { useEffect, useState } from 'react';
import style from './css/BrandCarousel.module.css';
import { useQuery } from '@apollo/client';
import { getBanners } from '../../../Admin/View/AdminBannersPublics/graphql/query';

const BrandCarousel: React.FC = () => {
  const { data } = useQuery(getBanners);
  const [images, setImages] = useState<string[]>([]);
  /*eslint-disable*/

  useEffect(() => {
    if (data?.Allbanners) {
      setImages((prevImages) => [
        ...prevImages,
        ...data.Allbanners.filter((banner: any) => banner.label.includes('Carrusel de marcas')).map(
          (banner: any) => banner.picture
        ),
      ]);
    }
  }, [data]);

  return (
    <div className='overflow-hidden whitespace-nowrap bg-[#000000]'>
      <div className={`${style.slider} inline-block [&>*]:h-[70px] [&>*]:mx-4`}>
        {images.map((image, index) => (
          <img key={index} src={image} />
        ))}
        {images.map((image, index) => (
          <img key={index + 'SEGUNDO'} src={image} />
        ))}
      </div>

      <div className={`${style.slider} inline-block [&>*]:h-[70px] [&>*]:mx-4`}>
        {images.map((image, index) => (
          <img key={index + 'TERCERO'} src={image} />
        ))}
        {images.map((image, index) => (
          <img key={index + 'CUARTO'} src={image} />
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;
