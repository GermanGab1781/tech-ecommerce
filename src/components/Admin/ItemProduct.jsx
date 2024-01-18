import React from "react";
import { motion } from "framer-motion";
import Item from "../Catalog/Item";
import { NavLink } from "react-router-dom";


const ItemProduct = ({ info, del }) => {
  const path = "/admin/edit/product/" + info.id;

  return (
    <motion.div className="relative">
      <Item info={info.data()} />
      <div className="absolute flex justify-between md:-bottom-4 -bottom-7 left-1/2 transform -translate-x-1/2 w-[60%]">
        <NavLink to={path} className="border border-black hover:bg-green-400 hover:text-white bg-green-500 p-2 cursor-pointer">Edit</NavLink>
        <div onClick={del} className="border border-black hover:bg-red-400 hover:text-white bg-red-500 p-2 cursor-pointer">Delete</div>
      </div>
    </motion.div>
  );
}

export default ItemProduct;
