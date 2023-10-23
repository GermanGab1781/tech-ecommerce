import React from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import SideBar from '../components/Catalog/SideBar';
import View from '../components/Catalog/View';
import TopBar from '../components/Catalog/TopBar';

const Catalog = () => {
  const [docs, setDocs] = useState(undefined)
  const [categs, setCategs] = useState(undefined)
  const [search, setSearch] = useState(undefined)
  const [loading, setLoading] = useState(false);

  const changeSearch = (newValue) => {
    if (search !== newValue) {
      setLoading(true)
      setSearch(newValue)
    }
  }
  /* setDocs(data.docs.map((doc) => ({ ...doc.data() }))) */
  /* get 6 */

  useEffect(() => {
    const getAllDocs = async () => {
      const q2 = collection(db, "/products/Categories/list")
      const data2 = await getDocs(q2)
      var q;
      if (search === undefined) {
        q = collection(db, "/products/ProductsInfo/All");
      } else {
        q = query(collection(db, "/products/ProductsInfo/All"), where("categorie", "==", search));
      }
      const data = await getDocs(q)

      setDocs(data.docs.slice(0, 1000).map((doc) => ({ ...doc.data() })))
      setCategs(data2.docs)
      setLoading(false)
    }
    getAllDocs()
  }, [search])


  return (
    <div className='relative pt-16 '>
      {categs &&
        <div className='flex border border-red-900 min-h-screen relative' >
          <SideBar list={categs} search={changeSearch} />
          <div className='border border-green-500 w-full h-full ml-[20%]'>
            <TopBar title={search} />
            {loading
              ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className='border text-3xl text-center pt-16 h-screen animate-pulse'>Loading Products</motion.div>
              : <View items={docs} />
            }

          </div>
        </div>
      }

      {(categs === undefined && docs === undefined) && <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold border'><span>LOADING CATALOG</span></div>}
    </div>
  );
}

export default Catalog;
