import React, { useContext } from 'react';
import { CartContext } from '../contexts/ShoppingCartContext';
import { BsCartXFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
const Cart = ({ toggle, setToggle }) => {
  const { cart, removeFromCart, total } = useContext(CartContext)

  return (
    <div className={toggle
      ? "fixed visible flex flex-col gap-y-4 pt-16 top-16 right-0 md:h-[60vh] md:w-[60vw] h-[80vh] w-[90vw] border border-blue-900 text-black bg-black overflow-y-auto transition-all"
      : "absolute invisible border"
    }>
      {cart.map((item, index) => {
        return (
          <div className='flex place-items-center w-full place-content-between h-20 border bg-white' key={index}>
            <div className='flex gap-x-2 place-items-center' >
              <span className='border bg-green-500 p-5'>{item.quantity}</span>
              <img className='w-10 h-10' src={item.data.image} alt={item.data.name} />
              <span>{item.data.name}</span>
              <span>${item.quantity * item.data.price}</span>
            </div>
            <div onClick={() => removeFromCart(item.data.id)} className='bg-red-600 p-3 cursor-pointer select-none rounded-md border hover:bg-red-400 hover:border-red-400 hover:text-white'><BsCartXFill /></div>
          </div>
        )
      })}
      <span className="bg-white flex flex-col m-auto p-2 text-center rounded-md">
        <div className="text-2xl">Total: <span className="text-green-600">${total}</span> </div>
        {total > 0
          ? (<NavLink to="/cart" className="text-xl border rounded-md bg-slate-200 p-2 hover:border-black">Proceed to checkout</NavLink>)
          : (<div className="text-3xl text-blue-500">You need <span className="text-red-600">ATLEAST</span> one product</div>)
        }

      </span>

      <div className='absolute top-0 right-0 bg-red-500 p-2 border w-16 text-center border-red-900 hover:text-white hover:border-red-400 rounded-md cursor-pointer select-none' onClick={setToggle}> X </div>
    </div>
  );
}

export default Cart;
