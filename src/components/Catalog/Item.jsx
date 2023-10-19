import React from 'react';
import { motion } from 'framer-motion';
const Item = ({ info }) => {
  return (
    <motion.div className='flex flex-col border border-blue-900 m-5 w-48 h-72'>
      <span className='h-[80%] bg-slate-400'>img</span>
      <div className='flex'>
        <div className='flex flex-col'>
          <span className='text-xl'>{info.name}</span>
          <span>{info.brand}</span>
        </div>
        <span className='m-auto text-xl text-green-600'>${info.price}</span>

      </div>

    </motion.div>
  );
}

export default Item;
