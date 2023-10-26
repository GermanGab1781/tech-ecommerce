import React from 'react';
import { motion } from 'framer-motion';
const Item = ({ info }) => {
  return (
    <motion.div className='flex flex-col border border-blue-900 m-5 w-48 h-72'>
      <img src={info.images[0].Url} className='h-[80%] bg-slate-400' />
      <div className='flex'>
        <div className='flex flex-col'>
          <span className='text-xl'>{info.info.name}</span>
          <span>{info.info.brand}</span>
        </div>
        <span className='m-auto text-xl text-green-600'>${info.info.price}</span>

      </div>
    </motion.div>
  );
}

export default Item;
