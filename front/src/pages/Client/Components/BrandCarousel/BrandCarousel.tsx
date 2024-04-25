import React from 'react';
import brandOne from './assets/brand1.jpg';
import brandTwo from './assets/brand2.jpg';
import brandThree from './assets/brand3.jpg';
import brandFour from './assets/brand4.jpg';
import style from './css/BrandCarousel.module.css';

const BrandCarousel: React.FC = () => {
  return (
    <div className='overflow-hidden whitespace-nowrap bg-[#000000]'>
      <div className={`${style.slider} inline-block [&>*]:h-[70px] [&>*]:mx-4`}>
        <img src={brandOne}></img>
        <img src={brandTwo}></img>
        <img src={brandThree}></img>
        <img src={brandFour}></img>
        <img src={brandOne}></img>
        <img src={brandTwo}></img>
        <img src={brandThree}></img>
        <img src={brandFour}></img>
      </div>

      <div className={`${style.slider} inline-block [&>*]:h-[70px] [&>*]:mx-4`}>
        <img src={brandOne}></img>
        <img src={brandTwo}></img>
        <img src={brandThree}></img>
        <img src={brandFour}></img>
        <img src={brandOne}></img>
        <img src={brandTwo}></img>
        <img src={brandThree}></img>
        <img src={brandFour}></img>
      </div>
    </div>
  );
};

export default BrandCarousel;
