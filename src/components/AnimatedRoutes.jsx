import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence location={location} key={location.pathname}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
