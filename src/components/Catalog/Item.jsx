import React from 'react';

const Item = (info) => {
  return (
    <div className='flex flex-col border border-blue-900 m-5 w-48'>
      <span className='h-[80%] bg-slate-400'>img</span>
      <div className='flex'>
        <div className='flex flex-col'>
          <span className='text-xl'>{info.info.name}</span>
          <span>{info.info.brand}</span>
        </div>
        <span className='m-auto text-xl text-green-600'>${info.info.price}</span>

      </div>

    </div>
  );
}

export default Item;
