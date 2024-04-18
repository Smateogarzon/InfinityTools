import NavBar from './pages/Core/components/NavBar/NavBar';
import AdBanner from './pages/Home/components/AdBanner/AdBanner';
import Carousel from './pages/Home/components/Carousel/Carousel';
import Featured from './pages/Home/components/Featured/Featured';
import HomeCards from './pages/Home/components/HomeCards/components/HomeCards';
import SearchBanner from './pages/Home/components/SearchBanner/SearchBanner';

import adOne from './pages/Home/assets/banner4.jpg';
import adTwo from './pages/Home/assets/banner1.jpg';
import InfoCards from './pages/Home/components/InfoCards/InfoCards';
import BrandCarousel from './pages/Home/components/BrandCarousel/BrandCarousel';
import Footer from './pages/Core/components/Footer/Footer';

function App() {
  return (
    <>
      <SearchBanner />
      <NavBar />
      <Carousel />
      <Featured />
      <HomeCards title='Ofertas de la semana' />

      <AdBanner img={adOne} />

      <HomeCards title='Lo más vendido' />

      <AdBanner img={adTwo} />

      <InfoCards />

      <BrandCarousel />

      <Footer />
    </>
  );
}

export default App;
