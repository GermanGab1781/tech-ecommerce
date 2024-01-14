import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Item from '../../../components/Admin/ItemCategory'
const View = () => {

  const [categories, setCategories] = useState(undefined)
  const [products, setProducts] = useState(undefined)
  const [categoryCounts, setCategoryCounts] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    const getAllCategories = async () => {
      const q = collection(db, "/products/Categories/list")
      const data = await getDocs(q)
      setCategories(data.docs)
      const q2 = collection(db, "/products/ProductsInfo/All")
      const data2 = await getDocs(q2)
      setProducts(data2.docs)
      /* To avoid user deleting/editing a category that already has products */
      const proccessData = data2.docs.map((doc) => doc.data());
      const resultArray = proccessData.reduce((acc, product) => {
        const categoryName = product.info.category;
        if (!acc[categoryName]) {
          acc[categoryName] = 1;
        } else {
          acc[categoryName] += 1;
        }
        return acc;
      }, {});
      setCategoryCounts(resultArray)
    }
    getAllCategories()
  }, [])

  const checkProds = (n, name, id) => {
    if (n !== undefined) {
      Swal.fire({
        title: name + ' has 1 or more products assigned',
        text: 'Edit or remove them to delete this category',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: "Redirect to product's page",
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/admin/view/product');
        }
      });
    } else {
      deleteCategory(id, name)
    }
  };

  const deleteCategory = (id, name) => {
    const delMsg = "Delete category: " + name;
    Swal.fire({
      title: delMsg,
      icon: 'question',
      showDenyButton: true,
      denyButtonText: 'NO',
      showConfirmButton: true,
      confirmButtonText: 'YES'
    }).then((result) => {
      if (result.isConfirmed === true) {
        deleteDoc(doc(db, 'products/Categories/list', id)).then(() => {
          Swal.fire({ icon: 'success', title: 'Deleted correctly' })
          let newArray = categories.filter(doc => doc.id !== id)
          setCategories(newArray)
        })
      }
    })
  }


  return (
    <div className='flex flex-col  min-h-screen'>
      <NavLink className='fixed md:left-5 left-0 p-1 bg-slate-800 border-orange-400 border text-2xl z-20 text-white' to="/Admin">Go back</NavLink>
      <h1 className='border-b-4 border-green-400 text-5xl text-white mx-auto'>Categories</h1>
      {categories && products
        ?
        <motion.div className='flex flex-wrap w-1/2 mx-auto mt-10 gap-10 place-content-center'>
          {categories.map((category, index) => {
            return (
              <Item key={index} info={category.data()} id={category.id} del={() => checkProds(categoryCounts[`${category.data().name}`], category.data().name, category.id,)} />
            )
          })}
        </motion.div>
        : <motion.div>Loading</motion.div>
      }
    </div>
  );
}

export default View;
