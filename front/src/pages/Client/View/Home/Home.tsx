import BrandCarousel from '../../Components/BrandCarousel/BrandCarousel';
import Carousel from '../../Components/Carousel/Carousel';
import Featured from '../../Components/Featured/Featured';
import InfoCards from '../../Components/InfoCards/InfoCards';
import SearchBanner from '../../Components/SearchBanner/SearchBanner';
import HomeCards from '../../Components/Cards/HomeCards';
import NavBar from '../../Components/NavBar/NavBar';
import { getCategories, getDescount, getMoreSale } from './graphql/query';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { findImg } from '../../../Admin/View/AdminBannersPublics/graphql/query';

function Home() {
  const nameRoute = useLocation().pathname;
  const { data, loading, error } = useQuery(getCategories);
  const carrusel = useQuery(findImg, {
    variables: {
      search: 'Carrusel 1 Home',
    },
  });
  const Carrusel2 = useQuery(findImg, {
    variables: {
      search: 'Carrusel 2 Home',
    },
  });

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
          <Carousel data={carrusel?.data?.bannerIMG} />
          <Featured />
          <HomeCards
            title={'Ofertas de la semana'}
            data={response?.data?.FindDescountProduct}
            descount={descount}
          />
          <Carousel data={Carrusel2?.data?.bannerIMG} />
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
