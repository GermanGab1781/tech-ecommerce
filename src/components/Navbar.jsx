import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  return (
    <motion.div className="fixed flex z-40 bg-slate-200 w-screen h-16 place-content-between">
      {/* Brand */}
      <NavLink className="my-auto" to="/"><span className="text-3xl">GogoGadget</span></NavLink>
      {/* Nav Items */}
      <div className='flex gap-x-3 my-auto mr-7'>
        <NavLink className="text-black transition-all delay-75" to="/Catalog">Catalog</NavLink>
        <NavLink className="text-black transition-all delay-75" to="/Cart">Cart</NavLink>
        <NavLink className="hover:text-slate-50  transition-all delay-75" to="/admin/login">Log in</NavLink>
      </div>
    </motion.div>
  )
}

// sm:text-red-800 md:text-amber-400 lg:text-lime-500 xl:text-sky-500 2xl:text-violet-700 