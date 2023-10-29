import React from 'react';
import { motion } from 'framer-motion';

const SideBar = ({ list, search }) => {

  const handleClick = (categ) => {
    const newValue = categ;
    search(newValue);
    window.scrollTo(0, 0);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className='border w-[20%] z-0 flex bg-gray-400 flex-col h-full fixed overflow-hidden pt-16 gap-y-5'
    >
      <div className='border text-xl text-center hover:font-bold cursor-pointer select-none' onClick={() => handleClick(undefined)}>All</div>
      {list.map((categ, index) => {
        return (
          <div key={index} className='border text-xl text-center hover:font-bold cursor-pointer select-none'
            onClick={() => handleClick(categ.data().name)}>
            {categ.data().name}
          </div>
        )
      })}
    </motion.div>
  );
}

export default SideBar;
