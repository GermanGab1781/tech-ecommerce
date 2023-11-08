import React from 'react';
import { NavLink } from 'react-router-dom';

const ItemCategHome = ({ name, preview }) => {
  return (
    <NavLink to={"/catalog/" + name} className='flex flex-col relative group h-[20vw] w-[20vw] border cursor-pointer place-items-center bg-white text-center'>
      <span className='text-xl'>{name}</span>
      <div className='relative grid grid-cols-2 gap-0 p-2 h-[90%] w-[90%]'>
        {preview.map((product, index) => {
          return (
            <img className='border p-2 bg-slate-100 h-[8vw] w-[8vw]' key={index} src={product} />
          )
        })}
      </div>
      <div className='absolute bottom-[10%] left-1/2 transform -translate-x-1/2 bg-slate-300 p-4 opacity-0 group-hover:opacity-100'>
        MORE
      </div>
    </NavLink>
  );
}

export default ItemCategHome;
