import React from 'react';
import { motion } from 'framer-motion';
import Item from './Item';

/* grid grid-rows-3 grid-cols-3 gap-4  */

const View = ({ items, title }) => {
  return (
    <motion.div key={items} className=''>
      <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className='h-[20%] text-5xl text-center text-white'>
        {title === undefined ? <span className=''>Our Products</span> : <span className=''>{title}</span>}
      </motion.div>
      <div className='flex border-2 border-black border-l-0  min-h-screen flex-wrap justify-center place-content-start gap-10 md:pt-o pt-5'>
        {items.length > 0 ? items.map((item, index) => {
          return (
            <Item key={index} info={item} />
          )
        })
          : <div className='text-4xl text-white text-center pt-16 animate-pulse'>No products in this category</div>
        }
      </div>
    </motion.div>
  );
}

export default View;
