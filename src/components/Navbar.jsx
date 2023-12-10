import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from '../contexts/ShoppingCartContext';
import { useAuthState } from '../firebase';

export default function Navbar() {
  const { quantity } = useContext(CartContext)
  const { user, isAuthenticated } = useAuthState();
  const [toggleCart, setToggleCart] = useState(false);

  return (
    <motion.div className="fixed flex z-40 font-raleway bg-black text-white border-y-2 border-orange-400 w-screen h-16 place-content-between">
      {/* Brand */}
      <NavLink className="my-auto" to="/"><span className="text-3xl">GogoGadget</span></NavLink>
      {/* Nav Items */}
      <div className='flex gap-x-3 my-auto mr-7'>
        <NavLink className=" transition-all delay-75" to="/Catalog">Catalog</NavLink>
        {/* Cart */}
        <div className="relative  transition-all delay-75 select-none cursor-pointer" onClick={() => { setToggleCart(!toggleCart) }}>
          < TiShoppingCart className='text-2xl' />
          <span className='absolute bottom-4 right-0'>{quantity}</span>
        </div>
        {isAuthenticated
          ? <NavLink className="hover:text-slate-50  transition-all delay-75 text-green-600" to="/admin/login">Admin</NavLink>
          : <NavLink className="hover:text-slate-50  transition-all delay-75" to="/admin/login">Admin</NavLink>
        }

      </div>
      <Cart toggle={toggleCart} setToggle={() => { setToggleCart(!toggleCart) }} />
    </motion.div>
  )
}

// sm:text-red-800 md:text-amber-400 lg:text-lime-500 xl:text-sky-500 2xl:text-violet-700 