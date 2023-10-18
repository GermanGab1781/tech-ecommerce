import React from 'react';
import { motion } from 'framer-motion';
const TopBar = ({ title, dirs }) => {
  return (
    <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className='h-[20%] text-5xl text-center'>
      {title === undefined ? <span>Our Products</span> : <span>{title}</span>}
    </motion.div>
  );
}

export default TopBar;
