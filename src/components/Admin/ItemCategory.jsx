import React from 'react';
import { NavLink } from 'react-router-dom';

const ItemCategory = ({ info, id }) => {
  const path = "/admin/edit/category/" + id
  return (
    <div className='relative flex text-center border w-32 h-32'>
      <div className='m-auto'>{info.name}</div>
      <div className="absolute flex justify-between -bottom-4 left-1/2 transform -translate-x-1/2">
        <NavLink to={path} className="border border-black hover:bg-green-400 hover:text-white bg-green-500 p-2 cursor-pointer">Edit</NavLink>
        <div className="border border-black hover:bg-red-400 hover:text-white bg-red-500 p-2 cursor-pointer">Delete</div>
      </div>
    </div>
  );
}

export default ItemCategory;
