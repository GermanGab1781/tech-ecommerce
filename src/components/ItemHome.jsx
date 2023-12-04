import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
const ItemHome = ({ info }) => {
  const path = "/product/" + info.id
  return (
    <NavLink to={path} className='relative flex flex-col group bg-white md:h-[20vw] md:w-[20vw] h-full w-full md:m-5 cursor-pointer border border-blue-900'>
      <img src={info.images[0].Url} className='md:h-[80%] md:w-[80%] h-full w-full border m-auto' />
      <div className='absolute md:bottom-[10%] bottom-[1%] left-1/2 transform -translate-x-1/2 bg-slate-100 md:p-4 p-1 text-center md:opacity-0 opacity-100 group-hover:opacity-100'>
        {info.info.name}
      </div>
    </NavLink>
  );
}

export default ItemHome;
