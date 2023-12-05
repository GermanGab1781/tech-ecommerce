import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/ShoppingCartContext';

const Cart = ({ toggle, setToggle }) => {
  const { cart, removeFromCart, total } = useContext(CartContext)


  return (
    <div className={toggle
      ? "fixed visible top-16 right-0 md:h-[50vh] md:w-[50vw] h-[80vh] w-[90vw] border text-white bg-black overflow-auto"
      : "absolute invisible border"
    }>
      {cart.map((item, index) => {
        return (
          <div className='flex place-items-center place-content-between mr-16' key={index}>
            <div className='flex gap-x-2' >
              <img className='w-10 h-10' src={item.data.image} alt={item.data.name} />
              <span>{item.data.name}</span>
              <span className='border bg-green-500 px-1'>{item.quantity}</span>
              <span>${item.quantity * item.data.price}</span>
            </div>
            <div onClick={() => removeFromCart(item.data.id)} className='bg-red-600 p-3'>X</div>
          </div>
        )
      })}
      <div>Total: ${total} </div>
      <div className='absolute top-0 right-0' onClick={setToggle}> CLOSE </div>
    </div>
  );
}

export default Cart;
