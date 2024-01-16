import React from 'react';
const ItemCategory = ({ info, id, del, edit }) => {
  return (
    <div className='relative flex text-center border border-orange-400 w-32 h-32 bg-black'>
      <div className='m-auto text-white text-2xl'>{info}</div>
      <div className="absolute flex justify-between -bottom-4 left-1/2 transform -translate-x-1/2 ">
        <div className="border border-black hover:bg-green-400 hover:text-white bg-green-500 p-2 cursor-pointer" onClick={edit}>Edit</div>
        <div className="border border-black hover:bg-red-400 hover:text-white bg-red-500 p-2 cursor-pointer" onClick={del}>Delete</div>
      </div>
    </div>
  );
}

export default ItemCategory;