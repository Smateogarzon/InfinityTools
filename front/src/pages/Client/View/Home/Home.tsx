import BrandCarousel from '../../Components/BrandCarousel/BrandCarousel';
import Carousel from '../../Components/Carousel/Carousel';
import Featured from '../../Components/Featured/Featured';
import InfoCards from '../../Components/InfoCards/InfoCards';
import SearchBanner from '../../Components/SearchBanner/SearchBanner';
import AdBanner from '../../Components/AdBanner/AdBanner';
import HomeCards from '../../Components/Cards/HomeCards';
import NavBar from '../../Components/NavBar/NavBar';
import { getCategories, getDescount, getMoreSale } from './graphql/query';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  const nameRoute = useLocation().pathname;
  const { data, loading, error } = useQuery(getCategories);
  const [gDescount, response] = useLazyQuery(getDescount);
  const response2 = useQuery(getMoreSale);
  const descount = true;
  useEffect(() => {
    gDescount({ variables: { filter: 'SellingPrice' } });
  }, []);

  return (
    <div>
      <SearchBanner />
      <NavBar data={data?.categoryRender} loading={loading} error={error} />
      {nameRoute === '/' && (
        <>
          <Carousel />
          <Featured />
          <HomeCards
            title={'Ofertas de la semana'}
            data={response?.data?.FindDescountProduct}
            descount={descount}
          />
          <AdBanner />
          <HomeCards
            title={'Lo más vendido'}
            data={response2?.data?.FindMoreSales}
            descount={false}
          />
          <InfoCards />
          <BrandCarousel />
        </>
      )}
    </div>
  );
}

export default Home;
