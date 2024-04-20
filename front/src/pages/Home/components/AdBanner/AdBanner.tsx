function AdBanner({ img }: { img: string }) {
  return (
    <img
      src={img}
      className='aspect-[16/4] w-full h-full object-cover border-solid border-x-0 border-y-[1px] border-bright-sun-600'></img>
  );
}
export default AdBanner;
