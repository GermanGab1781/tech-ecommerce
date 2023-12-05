import React, { useContext } from 'react';
import { CartContext } from '../contexts/ShoppingCartContext';

const Cart = ({ toggle, setToggle }) => {
  const { cart, setCart } = useContext(CartContext)

  return (
    <div className={toggle
      ? "fixed visible top-16 right-0 md:h-[50vh] md:w-[50vw] h-[80vh] w-[90vw] border text-white bg-black overflow-auto"
      : "absolute invisible border"
    }>
      {cart.map((item, index) => {
        return (<div key={index}>{item[0].name} {item[0].quantity}</div>)
      })}
      <div className='absolute top-0 right-0' onClick={setToggle}> CLOSE </div>
    </div>
  );
}

export default Cart;
