import BrandCarousel from '../../Components/BrandCarousel/BrandCarousel';
import Carousel from '../../Components/Carousel/Carousel';
import Featured from '../../Components/Featured/Featured';
import InfoCards from '../../Components/InfoCards/InfoCards';
import SearchBanner from '../../Components/SearchBanner/SearchBanner';
import AdBanner from '../../Components/AdBanner/AdBanner';
import HomeCards from '../../Components/Cards/HomeCards';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';

function Home() {
  return (
    <div>
      <SearchBanner />
      <NavBar />
      <Carousel />
      <Featured />
      <HomeCards title={'Ofertas de la semana'} />
      <AdBanner />
      <HomeCards title={'Lo más vendido'} />
      <InfoCards />
      <BrandCarousel />
      <Footer />
    </div>
  );
}

export default Home;
