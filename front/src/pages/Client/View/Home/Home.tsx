import BrandCarousel from '../../Components/BrandCarousel/BrandCarousel';
import Carousel from '../../Components/Carousel/Carousel';
import Featured from '../../Components/Featured/Featured';
import InfoCards from '../../Components/InfoCards/InfoCards';
import SearchBanner from '../../Components/SearchBanner/SearchBanner';
import AdBanner from '../../Components/AdBanner/AdBanner';
import HomeCards from '../../Components/Cards/HomeCards';
import NavBar from '../../Components/NavBar/NavBar';
import { getCategories } from './graphql/query';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

function Home() {
  const nameRoute = useLocation().pathname;
  const { data, loading, error } = useQuery(getCategories);
  return (
    <div>
      <SearchBanner />
      <NavBar data={data?.categoryRender} loading={loading} error={error} />
      {nameRoute === '/' && (
        <>
          <Carousel />
          <Featured />
          <HomeCards title={'Ofertas de la semana'} />
          <AdBanner />
          <HomeCards title={'Lo más vendido'} />
          <InfoCards />
          <BrandCarousel />
        </>
      )}
    </div>
  );
}

export default Home;
