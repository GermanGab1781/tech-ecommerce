import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const CatalogBar = (list) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      className='border w-[20%] z-0 flex flex-col h-full fixed overflow-hidden pt-16 gap-y-5'
    >
      {list.categories.map((categ, index) => {
        return (
          <NavLink key={index} className='border text-xl text-center' to="/Catalog">{categ.data().Name}</NavLink>
        )
      })}
    </motion.div>
  );
}

export default CatalogBar;
