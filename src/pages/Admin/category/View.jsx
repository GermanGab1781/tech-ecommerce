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
    <div>
      <NavLink className='fixed left-5' to="/Admin">Go back</NavLink>
      {categories
        ?
        <motion.div className='flex flex-col place-items-center'>
          {console.log(categories)}
          {categories.map((category, index) => {
            return (
              <Item key={index} name={category.data().name} />
            )
          })}
        </motion.div>
        : <motion.div>Loading</motion.div>
      }
    </div>
  );
}

export default View;
