import React from 'react';
import { NavLink } from 'react-router-dom';
const ItemHome = ({ info }) => {
  const path = "/product/" + info.id
  return (
    <NavLink to={path} className='relative flex flex-col group hover:border-orange-400 bg-slate-600 md:h-[20vw] md:w-[20vw] h-full w-full md:m-5 cursor-pointer border border-blue-800'>
      <img src={info.images[0].Url} className='md:h-[80%] md:w-[80%] h-full w-full border m-auto bg-white' />
      <div className='absolute md:bottom-[10%] bottom-[1%] left-1/2 transform -translate-x-1/2 text-white bg-slate-700 border border-orange-400 md:p-4 p-1 text-center opacity-100 whitespace-nowrap'>
        {info.info.name}
      </div>
    </NavLink>
  );
}

export default ItemHome;
