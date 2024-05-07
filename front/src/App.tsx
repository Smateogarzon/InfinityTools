import { Route, Routes, useLocation } from 'react-router-dom';
import ViewStatistics from './pages/Admin/View/AdminStatistics/ViewStatistics';
import ViewClient from './pages/Admin/View/AdminClients/ViewClient';
import ViewClientDetail from './pages/Admin/View/AdminClients/ViewClientDetail';
import ViewOrders from './pages/Admin/View/AdminOrders/ViewOrders';
import ViewProducts from './pages/Admin/View/AdminProducts/ViewProducts';
import ViewNetworks from './pages/Admin/View/AdminNetworks/ViewNetworks';
import ViewBannersPublics from './pages/Admin/View/AdminBannersPublics/ViewBannersPublics';
import ViewSeoAndMetadata from './pages/Admin/View/AdminSeoAndMetadata/ViewSeoAndMetadata';
import ViewMailing from './pages/Admin/View/AdminMailing/ViewMailing';
import ViewPartners from './pages/Admin/View/AdminPartners/ViewPartners';
import ViewBanners from './pages/Admin/View/AdminBanners/ViewBanners';
import NavAdmin from './pages/Admin/Components/NavAdmin/NavAdmin';
import Home from './pages/Client/View/Home/Home';
import Login from './pages/Client/View/Login&Register/login';
import { useDispatch } from 'react-redux';
import { getFacebookAccess, getGoogleAccess } from '@/store/slices/auth.slice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const query = useLocation().search;

  useEffect(() => {
    (() => {
      if (query === '?auth=google') {
        return dispatch(getGoogleAccess());
      } else if (query === '?auth=facebook') {
        return dispatch(getFacebookAccess());
      }
    })();
  }, [dispatch, query]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='admin/client/detail/:id' element={<ViewClientDetail />} />
      <Route
        path='/admin/*'
        element={
          <>
            <NavAdmin />
            <Routes>
              <Route path='/statistics' element={<ViewStatistics />} />
              <Route path='/clients' element={<ViewClient />} />
              <Route path='/orders' element={<ViewOrders />} />
              <Route path='/products' element={<ViewProducts />} />
              <Route path='/networks' element={<ViewNetworks />} />
              <Route path='/bannersPublics' element={<ViewBannersPublics />} />
              <Route path='/seoAndMetadata' element={<ViewSeoAndMetadata />} />
              <Route path='/admin/mailing' element={<ViewMailing />} />
              <Route path='/partners' element={<ViewPartners />} />
              <Route path='/banners' element={<ViewBanners />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}

export default App;
