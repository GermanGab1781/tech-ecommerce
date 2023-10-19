import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Login from '../pages/Admin/Login';
import Admin from '../pages/Admin/Admin';
import UploadProduct from '../pages/Admin/UploadProduct';
import PrivateRoute from './PrivateRoute';
import AlreadyLogin from './AlreadyLogin';

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
        <Route path='/admin/upload/product' element={<PrivateRoute><UploadProduct /></PrivateRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
