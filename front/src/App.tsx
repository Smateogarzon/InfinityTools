import NavBar from './pages/Core/components/NavBar/NavBar';
import Carousel from './pages/Home/components/Carousel/Carousel';
import Featured from './pages/Home/components/Featured/Featured';
import SearchBanner from './pages/Home/components/SearchBanner/SearchBanner';

function App() {
  return (
    <>
      <SearchBanner />
      <NavBar />
      <Carousel />
      <Featured />
    </>
  );
}

export default App;
