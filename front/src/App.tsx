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
import NavAdmin from './pages/Admin/Components/NavAdmin/NavAdmin';
import Home from './pages/Client/View/Home/Home';
import Login from './pages/Client/View/Login&Register/login';
import { useDispatch } from 'react-redux';
import { getFacebookAccess, getGoogleAccess } from '@/store/slices/auth.slice';
import { useEffect, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import SelectCategory from './pages/Client/View/categorySelecter/selecCategory';
import Footer from './pages/Client/Components/Footer/Footer';
import ViewProductDetail from './pages/Admin/View/AdminProducts/viewProductDetail';
import MapsServices from './pages/Client/View/serviceCenter/mapsServices';
import Register from './pages/Client/View/Login&Register/Register';
import Profile from './pages/Client/View/profile/profile';
import DetailProduct from './pages/Client/View/detail/detail';
import DetailProductMobile from './pages/Admin/View/AdminProducts/components/products/detailProductMobile';
import { useAppDispatch, useAppSelector } from './store';
import { cartUser } from './store/thukns/auth.thuks';
import Cart from './pages/Client/View/cart/cart';

function App() {
  const { rol } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();
  const query = useLocation().search;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);
  useEffect(() => {
    (() => {
      if (query === '?auth=google') {
        return dispatch(getGoogleAccess());
      } else if (query === '?auth=facebook') {
        return dispatch(getFacebookAccess());
      }
    })();
  }, [dispatch, query]);

  useEffect(() => {
    if (rol !== '') {
      dispatchAsync(cartUser());
    }
  }, [rol, dispatchAsync]);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
      <Routes>
        <Route
          path='/*'
          element={
            <>
              <Home />
              <Routes>
                <Route path='/category/:name/:subcategory' element={<SelectCategory />} />
                <Route path='/service_center' element={<MapsServices />} />
                <Route path='/profile' element={<Profile />} />
                <Route
                  path='/detail/:id'
                  element={width < 725 ? <DetailProductMobile /> : <DetailProduct />}
                />
                <Route path='/cart/:id?' element={<Cart />} />
              </Routes>
              <Footer />
            </>
          }
        />
        <Route path='/register/:name' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='admin/client/detail/:id' element={<ViewClientDetail />} />
        <Route path='admin/products/detail/:id' element={<ViewProductDetail />} />
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
              </Routes>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
