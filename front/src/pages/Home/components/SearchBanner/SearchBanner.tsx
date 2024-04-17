import banner from '../../assets/banner1.jpg';
import logo from '../../assets/logo.jpg';
import SearchBar from '../SearchBar/SearchBar.tsx';

export default function SearchBanner() {
  return (
    <div className='h-[125px] flex'>
      <div className='bg-[#000000] h-full w-full md:w-[35%] flex flex-col items-center px-4'>
        <img className='w-[120px] h-[50px] inline-block mt-[10px]' src={logo}></img>
        <SearchBar className='w-full mt-[10px] ' />
      </div>

      <img
        src={banner}
        className='hidden md:inline bg-bright-sun-600 h-full w-[65%] object-cover object-bottom'></img>
    </div>
  );
}
