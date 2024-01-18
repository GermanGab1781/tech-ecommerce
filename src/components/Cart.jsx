import React, { useContext } from 'react';
import { CartContext } from '../contexts/ShoppingCartContext';
import { BsCartXFill, BsCartPlusFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
const Cart = ({ toggle, setToggle }) => {
  const { cart, removeFromCart, total, addToCart } = useContext(CartContext)

  return (
    <div className={toggle
      ? "fixed visible flex flex-col gap-y-4 pt-16 px-2 top-16 right-0 md:h-[60vh] md:w-[60vw] h-[80vh] w-[90vw] border border-blue-900 text-black bg-black overflow-y-auto transition-all pb-5"
      : "absolute invisible border"
    }>
      <span className="bg-white flex w-full p-2 text-center rounded-md">
        {total > 0
          ? (<NavLink to="/cart" className="border-2 border-green-400 select-none cursor-pointer bg-slate-800 hover:bg-green-500 text-xl p-5 md:col-start-2 w-[60%] mx-auto text-white">Proceed to checkout</NavLink>)
          : (<div className="text-3xl text-blue-500 m-auto">You need <span className="text-red-600">ATLEAST</span> one product</div>)
        }
        <div className="text-2xl m-auto">Total: <span className="text-green-600">${total}</span> </div>
      </span>
      {cart.map((item, index) => {
        return (
          <div className='flex place-items-center w-full place-content-between h-20 border bg-white' key={index}>
            <div className='flex gap-x-2 place-items-center' >
              <NavLink className='flex place-items-center' to={"/product/" + item.id}>
                <img className='w-16 h-16 border-r mr-2 border-black' src={item.info.image} alt={item.info.name} />
                <span className='text-2xl'>{item.info.name}</span>
              </NavLink>
              <span className='text-green-500 bg-slate-800 p-5'>${item.quantity * item.info.price}</span>
            </div>
            <span className='flex place-items-center'>
              <span className='border bg-green-500 p-5'>{item.quantity}</span>
              <span onClick={() => addToCart(item)} className='bg-green-500 p-3 h-10 w-10 cursor-pointer select-none rounded-md border hover:bg-green-400 hover:border-green-400 hover:text-white'><BsCartPlusFill /></span>
              <div onClick={() => removeFromCart(item.info.id)} className='bg-red-600 p-3 h-10 w-10 flex cursor-pointer select-none rounded-md border hover:bg-red-400 hover:border-red-400 hover:text-white'><BsCartXFill /></div>
            </span>
          </div>
        )
      })}


      <div className='absolute top-0 right-0 bg-red-500 p-2 border w-16 text-center border-red-900 hover:text-white hover:border-red-400 rounded-md cursor-pointer select-none' onClick={setToggle}> X </div>
    </div>
  );
}

export default Cart;
