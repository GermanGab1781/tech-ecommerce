import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SideBar = ({ categs, search, brands }) => {
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [mobileToggle, setMobileToggle] = useState(false);
  const handleClick = (value, type) => {
    setMobileToggle(!mobileToggle)
    const newValue = value;
    search(newValue, type);
    window.scrollTo(0, 0);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className={mobileToggle
        ? 'md:relative fixed md:w-[20%] md:top-0 top-4 w-3/4 z-20 flex bg-slate-800 flex-col h-full overflow-hidden mt-12 gap-y-3 md:min-h-screen h-35 border-2 border-black transition-all duration-300'
        : 'md:relative fixed md:w-[20%] md:top-0 top-4 w-0 z-20 flex bg-slate-800 flex-col h-full overflow-hidden mt-12 gap-y-3 md:min-h-screen h-35 md:border-2 border-0 border-black transition-all duration-300'
      }
    >
      {/* Content */}
      <span className={mobileToggle ? 'w-full h-auto transition-all duration-300 gap-y-2' : 'md:w-auto w-0 h-auto transition-all duration-300'}>
        <div className='border-2 border-x-0 text-white bg-slate-700 border-t-0 border-black text-xl text-center font-bold cursor-pointer select-none mb-3' onClick={() => handleClick(undefined, undefined)}>All</div>
        <div className='border-2 border-x-0 text-white bg-slate-700 border-black text-xl text-center font-bold cursor-pointer select-none mb-3' onClick={() => setShowCategories(!showCategories)}>CATEGORIES  {showCategories ? ("<") : (">")}</div>
        <div className={showCategories
          ? "visible max-h-screen transition-all ease-in-out duration-300 mb-3"
          : "invisible max-h-0 transition-all ease-in-out duration-300 overflow-hidden"
        }>
          {categs.map((categ, index) => {
            return (
              <div key={index} className='border border-blue-900 hover:border-orange-400 text-xl text-center hover:font-bold font-medium  text-slate-200 hover:text-black cursor-pointer select-none'
                onClick={() => handleClick(categ.data().name, "category")}>
                {categ.data().name}
              </div>
            )
          })}
        </div>
        <div className='border-2 border-x-0 text-white bg-slate-700 border-black text-xl text-center font-bold cursor-pointer select-none mb-3' onClick={() => setShowBrands(!showBrands)}>BRANDS  {showBrands ? ("<") : (">")}</div>
        <div className={showBrands
          ? "visible max-h-screen transition-all ease-in-out duration-300 mb-3"
          : "invisible max-h-0 transition-all ease-in-out duration-300 overflow-hidden"
        }>
          {brands.map((brand, index) => {
            return (
              <div key={index} className='border border-blue-900 hover:border-orange-400 text-xl text-center hover:font-bold font-medium  text-slate-200 hover:text-black cursor-pointer select-none'
                onClick={() => handleClick(brand, "brand")}>
                {brand}
              </div>
            )
          })}
        </div>
      </span>
      {/* Mobile Toggle button */}
      <span className={mobileToggle
        ? 'md:absolute md:invisible top-[8%] fixed right-4 select-none border rounded-xl border-red-900 p-3 bg-red-300 transition-all duration-300' : 'md:absolute top-[15%] md:invisible  fixed right-2 select-none border rounded-xl border-black p-2 bg-blue-300 transition-all duration-300'}
        onClick={() => setMobileToggle(!mobileToggle)}>{mobileToggle ? "Close" : "Filter"}</span>
    </motion.div>
  );
}

export default SideBar;
