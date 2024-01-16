import { collection, getDocs, updateDoc } from 'firebase/firestore'
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
      setCategories(data.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      const q2 = collection(db, "/products/ProductsInfo/All")
      const data2 = await getDocs(q2)
      /* To avoid user deleting/editing a category that already has products */
      const proccessData = data2.docs.map((doc) => doc.data());
      setProducts(proccessData)
      const resultArray = proccessData.reduce((arr, product) => {
        const categoryName = product.info.category;
        if (!arr[categoryName]) {
          arr[categoryName] = {
            count: 1,
            id: [product.id]
          }
        } else {
          arr[categoryName].count += 1;
          arr[categoryName].id.push(product.id)
        }
        return arr;
      }, {});
      setCategoryCounts(resultArray)
    }
    getAllCategories()
  }, [])

  const checkProductsEdit = async (n, name, id, index) => {
    /* if it has products assigned */
    if (n.count > 0) {
      const confirmResult = await Swal.fire({
        title: name + ' has 1 or more products assigned',
        text: 'Editing the name will edit those products as well',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: "Change name",
        cancelButtonText: 'Cancel',
      });

      if (confirmResult.isConfirmed) {
        const newNameResult = await Swal.fire({
          title: 'New Category Name:',
          input: 'text',
          inputPlaceholder: 'new name',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel'
        });

        if (newNameResult.isConfirmed) {
          Swal.fire({ title: 'Updating all Products', text: 'Please wait', icon: 'info' });
          const productsOfCateg = products.filter(doc => doc.info.category === name)
          const productsModified = productsOfCateg.map((product) => ({ ...product, info: { ...product.info, category: newNameResult.value } }))
          const thisDocRef = (doc(db, "products/Categories/list", id))
          updateDoc((thisDocRef), {
            name: newNameResult.value
          }).then(() => {
            updateDocsBatch(productsModified)
            const updatedArray = [...categories]
            updatedArray[index].data.name = newNameResult.value
            setCategories(updatedArray)
          })

        }
      }
      /* No products Assigned */
    } else {
      const newNameResult = await Swal.fire({
        title: 'New Category Name:',
        input: 'text',
        inputPlaceholder: 'new name',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel'
      });
      if (newNameResult.isConfirmed) {
        updateDoc((doc(db, "products/Categories/list", id)), {
          name: newNameResult.value
        }).then(() => {
          Swal.fire({ icon: 'success', title: 'Category updated' })
          const updatedArray = [...categories]
          updatedArray[index].data.name = newNameResult.value
          setCategories(updatedArray)
        })

      }
    }
  };
  const updateDocsBatch = (batch) => {
    console.log(batch[0])
    const updatePromises = batch.map((product) => {
      const thisDocRef = (doc(db, "products/ProductsInfo/All", product.id))
      return updateDoc(thisDocRef, product)
    })
    return Promise.all(updatePromises)
      .then(() => {
        Swal.fire({ title: 'Category and products related updated!!!', icon: 'success', showConfirmButton: 'false' })
        return batch
      })
      .catch((error) => {
        console.log(error)
        throw error;
      })
  }


  const checkProductsDelete = (n, name, id) => {
    if (n.count > 0) {
      Swal.fire({
        title: name + ' has 1 or more products assigned',
        text: 'Edit or remove them to delete this category',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: "Redirect to product's page",
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/admin/view/product/${name}`);
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
      {categories && products && categoryCounts
        ?
        <motion.div className='flex flex-wrap w-1/2 mx-auto mt-10 gap-10 place-content-center'>
          {categories.map((category, index) => {
            return (
              <span key={index}>
                {/* to avoid undefined errors */}
                {
                  categoryCounts[`${category.data.name}`]
                    /* if it has products assigned */
                    ?
                    <Item key={category.id}
                      info={category.data.name}
                      id={category.id}
                      del={() => checkProductsDelete(categoryCounts[`${category.data.name}`], category.data.name, category.id)}
                      edit={() => checkProductsEdit(categoryCounts[`${category.data.name}`], category.data.name, category.id, index)}
                    />
                    /* if it doesn't */
                    :
                    <Item key={category.id}
                      info={category.data.name}
                      id={category.id}
                      del={() => checkProductsDelete(0, category.data.name, category.id)}
                      edit={() => checkProductsEdit(0, category.data.name, category.id, index)}
                    />
                }
              </span>
            )
          })}
        </motion.div>
        : <motion.div>Loading</motion.div>

      }
    </div>
  );
}

export default View;
