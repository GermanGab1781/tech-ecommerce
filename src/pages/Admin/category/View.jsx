import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Item from '../../../components/Admin/ItemCategory'
const View = () => {

  const [categories, setCategories] = useState(undefined)

  useEffect(() => {
    const getAllCategories = async () => {
      const q = collection(db, "/products/Categories/list")
      const data = await getDocs(q)
      setCategories(data.docs)
    }
    getAllCategories()
  }, [])

  return (
    <div className='flex flex-col  min-h-screen'>
      <NavLink className='fixed md:left-5 left-0 p-1 bg-slate-800 border-orange-400 border text-2xl z-20 text-white' to="/Admin">Go back</NavLink>
      <h1 className='border-b-4 border-green-400 text-5xl text-white mx-auto'>Categories</h1>
      {categories
        ?
        <motion.div className='flex flex-wrap w-1/2 mx-auto mt-10 gap-10 place-content-center'>

          {categories.map((category, index) => {
            return (
              <Item key={index} info={category.data()} id={category.id} />
            )
          })}
        </motion.div>
        : <motion.div>Loading</motion.div>
      }
    </div>
  );
}

export default View;
