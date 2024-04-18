function AdBanner({ img }: { img: string }) {
  return <img src={img} className='aspect-[16/4] w-full h-full object-cover'></img>;
}
export default AdBanner;
