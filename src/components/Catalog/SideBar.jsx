import React from 'react';
import { motion } from 'framer-motion';

const SideBar = ({ categs, search, brands }) => {

  const handleClick = (value, type) => {
    const newValue = value;
    search(newValue, type);
    window.scrollTo(0, 0);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className='border w-[20%] z-0 flex bg-gray-400 flex-col h-full overflow-hidden pt-16 gap-y-5'
    >
      <div className='border text-xl text-center font-bold'>CATEGORIES</div>
      <div className='border text-xl text-center hover:font-bold cursor-pointer select-none' onClick={() => handleClick(undefined, undefined)}>All</div>
      {categs.map((categ, index) => {
        return (
          <div key={index} className='border text-xl text-center hover:font-bold cursor-pointer select-none'
            onClick={() => handleClick(categ.data().name, "category")}>
            {categ.data().name}
          </div>
        )
      })}
      <div className='border text-xl text-center font-bold'>BRANDS</div>
      {brands.map((brand, index) => {
        return (
          <div key={index} className='border text-xl text-center hover:font-bold cursor-pointer select-none'
            onClick={() => handleClick(brand, "brand")}>
            {brand}
          </div>
        )
      })}
    </motion.div>
  );
}

export default SideBar;
