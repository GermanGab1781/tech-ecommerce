import React from 'react';
import { motion } from 'framer-motion';
import Item from './Item';

/* grid grid-rows-3 grid-cols-3 gap-4  */

const View = ({ items }) => {
  return (
    <motion.div key={items} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className='border min-h-screen flex flex-wrap justify-center'
    >
      {items.length > 0 ? items.map((item, index) => {
        return (
          <Item key={index} info={item} />
        )
      })
        : <div className='text-3xl text-center pt-16 h-screen animate-pulse'>No products in this category</div>
      }
    </motion.div>
  );
}

export default View;
