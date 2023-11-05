import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
const ItemHome = ({ info }) => {
  const path = "/product/" + info.id
  return (
    <NavLink to={path} className='relative flex flex-col group bg-white h-[20vw] w-[20vw] m-5 cursor-pointer'>
      <img src={info.images[0].Url} className='h-[80%] w-[80%] border m-auto' />
      <div className='absolute bottom-[10%] left-1/2 transform -translate-x-1/2 bg-slate-300 p-4 opacity-0 group-hover:opacity-100'>
        {info.info.name}
      </div>
    </NavLink>
  );
}

export default ItemHome;
