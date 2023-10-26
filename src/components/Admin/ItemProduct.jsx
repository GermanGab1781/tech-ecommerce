import React from "react";
import { motion } from "framer-motion";
import Item from "../Catalog/Item";
import { NavLink } from "react-router-dom";


const ItemProduct = ({ info, del }) => {
  const path = "/admin/edit/product/" + info.id;

  return (
    <motion.div className="relative">
      <Item info={info} />
      <div className="absolute flex justify-between -bottom-4 left-1/2 transform -translate-x-1/2 w-[60%]">
        <NavLink to={path} className="border border-black hover:bg-green-400 bg-green-500 p-2 cursor-pointer">Editar</NavLink>
        <div onClick={del} className="border border-black hover:bg-red-400 bg-red-500 p-2 cursor-pointer">Borrar</div>
      </div>
    </motion.div>
  );
}

export default ItemProduct;
