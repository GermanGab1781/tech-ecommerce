import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col m-auto place-content-center gap-y-10 py-24 text-center w-[80%]'>
      <NavLink className='fixed left-5 top-[15%]' to="/Admin">Go back</NavLink>
      <h1 className='text-4xl font-bold'>Home page changes</h1>
      <NavLink className='border w-full m-auto border-black p-5 hover:bg-black hover:text-white' to="/admin/home/carousel">
        Carousel</NavLink>
      <NavLink className='border w-full m-auto border-black p-5 hover:bg-black hover:text-white' to="/admin/home/latest">
        "Latest" section</NavLink>
    </div>
  );
}

export default Home;
