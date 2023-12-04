import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SideBar = ({ categs, search, brands }) => {
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const handleClick = (value, type) => {
    const newValue = value;
    search(newValue, type);
    window.scrollTo(0, 0);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className='border-2 border-r-0 border-blue-900 w-[20%] z-0 flex bg-slate-100 flex-col h-full overflow-hidden mt-12 gap-y-3 min-h-screen'
    >
      <div className='border-2 border-t-0 border-x-0 border-blue-900 text-xl text-center font-bold cursor-pointer select-none' onClick={() => handleClick(undefined, undefined)}>All</div>
      <div className='border-2 border-x-0 border-blue-900 text-xl text-center font-bold cursor-pointer select-none' onClick={() => setShowCategories(!showCategories)}>CATEGORIES  {showCategories ? ("<") : (">")}</div>
      <div className={showCategories
        ? "visible max-h-screen transition-all ease-in-out duration-300"
        : "invisible max-h-0 transition-all ease-in-out duration-300 overflow-hidden"
      }>
        {categs.map((categ, index) => {
          return (
            <div key={index} className='border text-xl text-center hover:font-bold font-medium text-slate-600 hover:text-black cursor-pointer select-none'
              onClick={() => handleClick(categ.data().name, "category")}>
              {categ.data().name}
            </div>
          )
        })}
      </div>
      <div className='border-2 border-x-0 border-blue-900 text-xl text-center font-bold cursor-pointer select-none' onClick={() => setShowBrands(!showBrands)}>BRANDS  {showBrands ? ("<") : (">")}</div>
      <div className={showBrands
        ? "visible max-h-screen transition-all ease-in-out duration-300"
        : "invisible max-h-0 transition-all ease-in-out duration-300 overflow-hidden"
      }>
        {brands.map((brand, index) => {
          return (
            <div key={index} className='border text-xl text-center hover:font-bold font-medium text-slate-600 hover:text-black cursor-pointer select-none'
              onClick={() => handleClick(brand, "brand")}>
              {brand}
            </div>
          )
        })}
      </div>
    </motion.div>
  );
}

export default SideBar;
