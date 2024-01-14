import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { db, storage } from '../../../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import ItemProduct from '../../../components/Admin/ItemProduct';
import Swal from 'sweetalert2';
import { deleteObject, ref } from 'firebase/storage';

const View = () => {
  const [products, setProducts] = useState(undefined)
  const [filteredProducts, setFilteredProducts] = useState(undefined)
  const [categories, setCategories] = useState(undefined)
  const [brands, setBrands] = useState(undefined)
  const [search, setSearch] = useState(["All", "All"])

  const params = useParams()
  const keywordCateg = params.id

  useEffect(() => {
    const getAllDocs = async () => {
      const data = await getDocs(collection(db, "/products/ProductsInfo/All"))
      const dataCateg = await getDocs(collection(db, "/products/Categories/list"))
      setProducts(data.docs)
      setFilteredProducts(data.docs)
      setCategories(dataCateg.docs)
      const initialBrands = new Set(data.docs.map(p => p.data().info.brand))
      setBrands(Array.from(initialBrands))
      if (keywordCateg !== undefined) {
        let searchKeys = []
        searchKeys.push(keywordCateg)
        searchKeys.push("All")
        setSearch(searchKeys)
      }
    }
    getAllDocs()
  }, [])

  useEffect(() => {
    /* All */
    if (search[0] === "All" && search[1] === "All") {
      setFilteredProducts(products)
      /* Category and Brand */
    } else if (search[0] !== "All" && search[1] !== "All") {
      setFilteredProducts(products.filter(item => (
        (item.data().info.category === search[0]) &&
        (item.data().info.brand === search[1]))))
      /* Brand Only */
    } else if (search[0] === "All" && search[1] !== "All") {
      setFilteredProducts(products.filter(item => item.data().info.brand === search[1]))
      /* Category Only */
    } else if (search[0] !== "All" && search[1] === "All") {
      console.log(products.filter(item => item.data().info.category === search[0]))
      setFilteredProducts(products.filter(item => item.data().info.category === search[0]))
    }
  }, [search])

  const changeSearch = (event, position) => {
    /* Position 0 is Category */
    if (position === 0) {
      setSearch(prevState => {
        const newArray = [...prevState]
        newArray[0] = event.target.value
        return newArray;
      })
    }
    /* Position 1 is Brand */
    else {
      setSearch(prevState => {
        const newArray = [...prevState]
        newArray[1] = event.target.value
        return newArray;
      })
    }
  }

  const deleteDocument = (idDoc, imgs, name) => {
    const delMsg = "Delete product: " + name;
    Swal.fire({
      title: delMsg,
      icon: 'question',
      showDenyButton: true,
      denyButtonText: 'NO',
      showConfirmButton: true,
      confirmButtonText: 'YES'
    }).then((result) => {
      if (result.isConfirmed === true) {
        imgs.forEach((img) => {
          const imgRef = ref(storage, img.path)
          deleteObject(imgRef).then(() => {
            let newArray = products.filter(doc => doc.id !== idDoc)
            setProducts(newArray)
          })

        })
        deleteDoc(doc(db, 'products/ProductsInfo/All', idDoc)).then(() => {
          Swal.fire({ icon: 'success', title: 'Deleted correctly' })
        })
      }
    })
  }

  return (
    <div className='flex flex-col'>
      <NavLink className='fixed md:left-5 left-0 p-1 bg-slate-800 border-orange-400 border text-2xl z-20 text-white' to="/Admin">Go back</NavLink>
      <h1 className='border-b-4 border-green-400 text-5xl text-white mx-auto'>Products</h1>
      {/* Filter */}
      <div className='flex bg-white mt-5 place-content-center'>
        <div className='flex flex-col w-1/2 text-center bg-green-400 p-2'>
          <label className='text-2xl mb-1'>Category</label>
          <select className='h-10 text-center' onChange={(event) => changeSearch(event, 0)} value={search[0]}>
            <option value="All">All</option>
            {categories &&
              categories.map((categ, index) => {
                return (
                  <option value={categ.data().name} key={index}>{categ.data().name}</option>
                )
              })
            }
          </select>
        </div>
        <div className='flex flex-col w-1/2 text-center bg-green-400 p-2'>
          <label className='text-2xl mb-1'>Brand</label>
          <select className='h-10 text-center' onChange={(event) => changeSearch(event, 1)} value={search[1]}>
            <option value="All">All</option>
            {brands &&
              brands.map((brand, index) => {
                return (
                  <option value={brand} key={index}>{brand}</option>
                )
              })
            }
          </select>
        </div>

      </div>
      {(filteredProducts && filteredProducts.length > 0)
        ? <div className='flex flex-wrap py-10 gap-10 place-content-center'>
          {filteredProducts.map((item, index) => {
            return (
              <ItemProduct key={index} info={item} del={() => { deleteDocument(item.data().id, item.data().images, item.data().info.name) }} />
            )
          })}
        </div>
        : <div className='text-white animate-pulse md:text-4xl text-3xl text-center mt-10'>No products in this Category/Brand</div>}
    </div>
  );
}

export default View;
