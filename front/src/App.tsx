import NavBar from './pages/Core/components/NavBar/NavBar';
import Carousel from './pages/Home/components/Carousel/Carousel';
import Featured from './pages/Home/components/Featured/Featured';
import HomeCard from './pages/Home/components/HomeCards/components/HomeCard';
import SearchBanner from './pages/Home/components/SearchBanner/SearchBanner';

function App() {
  return (
    <>
      <SearchBanner />
      <NavBar />
      <Carousel />
      <Featured />
      <HomeCard />
    </>
  );
}

export default App;
