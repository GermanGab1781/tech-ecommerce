import React from 'react';
import { NavLink } from 'react-router-dom';

const ItemPreviewHome = ({ name, preview, type }) => {
  return (
    <NavLink to={"/catalog/" + type + "/" + name} className='flex flex-col relative group md:w-[20vw] aspect-square cursor-pointer place-items-center bg-blue-900 text-center border border-blue-900'>
      <span className='text-xl text-white'>{name}</span>
      <div className='relative grid grid-cols-2 md:gap-y-1 gap-y-4 p-2 h-[90%] w-[90%] place-items-center place-content-start '>
        {preview.map((product, index) => {
          return (
            <img className='border border-blue-800 p-2 bg-slate-100 md:w-[8vw] w-3/4 aspect-square' key={index} src={product} />
          )
        })}
      </div>
      <div className='absolute md:bottom-[15%] bottom-1/2 left-1/2 text-white transform -translate-x-1/2 md:translate-y-auto translate-y-1/2 bg-slate-700 border border-orange-400 p-4 md:opacity-0 opacity-100 group-hover:opacity-100'>
        MORE
      </div>
    </NavLink>
  );
}

export default ItemPreviewHome;
