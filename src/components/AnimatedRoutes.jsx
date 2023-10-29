import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';


/* Admin */
import Admin from '../pages/Admin/Admin';
import Login from '../pages/Admin/Login';
import PrivateRoute from './PrivateRoute';
import AlreadyLogin from './AlreadyLogin';
/* home */
import HomeImgs from '../pages/Admin/home/Home';
/* product */
import UploadProduct from '../pages/Admin/product/Upload';
import EditProduct from '../pages/Admin/product/Edit';
import ViewProducts from '../pages/Admin/product/View';
/* category */
import UploadCategory from '../pages/Admin/category/Upload';
import EditCategory from '../pages/Admin/category/Edit';
import ViewCategories from '../pages/Admin/category/View';
import Latest from '../pages/Admin/home/Latest';
import Carousel from '../pages/Admin/home/Carousel';
import FirstSlide from '../pages/Admin/home/firstSlide';
import SecondSlide from '../pages/Admin/home/secondSlide';
import ThirdSlide from '../pages/Admin/home/thirdSlide';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence location={location} key={location.pathname}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        {/* Admin */}
        <Route path='/admin/login' element={<AlreadyLogin><Login /></AlreadyLogin>} />
        <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
        {/* home */}
        <Route path='/admin/home' element={<PrivateRoute><HomeImgs /></PrivateRoute>} />
        <Route path='/admin/home/latest' element={<PrivateRoute><Latest /></PrivateRoute>} />
        <Route path='/admin/home/carousel' element={<PrivateRoute><Carousel /></PrivateRoute>} />
        <Route path='/admin/home/carousel/firstSlide' element={<PrivateRoute><FirstSlide /></PrivateRoute>} />
        <Route path='/admin/home/carousel/secondSlide' element={<PrivateRoute><SecondSlide /></PrivateRoute>} />
        <Route path='/admin/home/carousel/thirdSlide' element={<PrivateRoute><ThirdSlide /></PrivateRoute>} />
        {/* product */}
        <Route path='/admin/upload/product' element={<PrivateRoute><UploadProduct /></PrivateRoute>} />
        <Route path='/admin/view/product' element={<PrivateRoute><ViewProducts /></PrivateRoute>} />
        <Route path='/admin/edit/product/:id' element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        {/* category */}
        <Route path='/admin/upload/category' element={<PrivateRoute><UploadCategory /></PrivateRoute>} />
        <Route path='/admin/view/category' element={<PrivateRoute><ViewCategories /></PrivateRoute>} />
        <Route path='/admin/edit/category/:id' element={<PrivateRoute><EditCategory /></PrivateRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
