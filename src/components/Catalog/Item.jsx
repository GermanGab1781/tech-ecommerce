import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
const Item = ({ info }) => {
  return (
    <NavLink to={"/product/" + info.id} className="group">
      <motion.div className='flex flex-col border-2 group-hover:scale-105 border-blue-900 m-2 mx-3 w-48 h-72 delay-75'>
        <img src={info.images[0].Url} className='h-[80%] bg-blue-900 border-b-2 border-black' />
        <div className='flex flex-col text-center'>
          <span className='text-xl group-hover:font-bold'>{info.info.name}</span>
          <span className='text-xl text-green-600'>${info.info.price}</span>
          <span>{info.info.brand}</span>
        </div>
      </motion.div >
    </NavLink>
  );
}

export default Item;
