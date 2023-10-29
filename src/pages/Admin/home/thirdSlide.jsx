import React from 'react';
import { NavLink } from 'react-router-dom';

const ThirdSlide = () => {
  return (
    <div>
      <NavLink className='fixed left-5 top-[15%]' to="/admin/home/carousel">Go back</NavLink>
    </div>
  );
}

export default ThirdSlide;
