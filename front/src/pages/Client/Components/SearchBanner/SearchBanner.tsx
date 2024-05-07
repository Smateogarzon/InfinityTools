import banner from '../../../../assets/banner1.jpg';
import SearchBar from '../SearchBar/SearchBar';

export default function SearchBanner() {
  return (
    <div className='h-[155px] flex'>
      <div className='md:bg-[#000000] h-full w-full md:w-[35%] flex flex-col items-center px-4'>
        <img
          className='w-[200px] inline-block mt-[10px] ,md:w-[250px]'
          src='https://storage.googleapis.com/pictures_infinity/logo.png'></img>
        <SearchBar className='w-[80%] mt-[15px] ' />
      </div>

      <img
        src={banner}
        className='hidden md:inline bg-bright-sun-600 h-full w-[65%] object-cover object-bottom'></img>
    </div>
  );
}
