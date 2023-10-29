import React from 'react';
import { NavLink } from 'react-router-dom';


const Carousel = () => {
  return (
    <div className='flex flex-col m-auto place-content-center gap-y-10 py-24 text-center w-[80%]'>
      <NavLink className='fixed left-5 top-[15%]' to="/admin/home">Go back</NavLink>
      <h1 className='text-4xl font-bold'>Carousel</h1>
      <NavLink className='border w-full m-auto border-black p-5 hover:bg-black hover:text-white' to="/admin/home/carousel/firstSlide">
        First Slide</NavLink>
      <NavLink className='border w-full m-auto border-black p-5 hover:bg-black hover:text-white' to="/admin/home/carousel/secondSlide">
        Second Slide</NavLink>
      <NavLink className='border w-full m-auto border-black p-5 hover:bg-black hover:text-white' to="/admin/home/carousel/thirdSlide">
        Third Slide</NavLink>
    </div>
  );
}

export default Carousel;
