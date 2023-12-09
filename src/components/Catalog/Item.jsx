import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../contexts/ShoppingCartContext';
import { FaCartPlus } from "react-icons/fa6";
const Item = ({ info }) => {
  const { addToCart } = useContext(CartContext)

  return (
    <div className='relative group overflow-hidden'>
      <NavLink to={"/product/" + info.id}>
        <motion.div className='flex flex-col border-2 border-blue-900 group-hover:border-orange-400 md:m-2 mx-3 w-60 h-72 md:w-96 md:h-96 delay-75'>
          <img src={info.images[0].Url} className='h-[80%] bg-white border-b-2 border-blue-300' />
          <div className='flex flex-col text-center bg-slate-100'>
            <span className='text-2xl md:text-4xl font-dosis'>{info.info.name}</span>
            <span className='text-xl text-green-600'>${info.info.price}</span>
            <span>{info.info.brand}</span>
          </div>
        </motion.div >
      </NavLink>
      <span onClick={() => addToCart(info)} className='absolute border  hover:bg-green-400 bg-green-500 bottom-4 right-5 p-2 select-none cursor-pointer'><FaCartPlus /></span>
    </div>
  );
}

export default Item;
