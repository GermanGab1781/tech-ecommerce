import React from 'react';
import { motion } from 'framer-motion';
import Item from './Item';

/* grid grid-rows-3 grid-cols-3 gap-4  */

const View = (items) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      className='border min-h-screen flex flex-wrap justify-center'
    >
      {items.items.map((item, index) => {
        return (
          <Item key={index} info={item} />
        )
      })}
    </motion.div>
  );
}

export default View;
