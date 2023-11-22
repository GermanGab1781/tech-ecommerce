import React from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import SideBar from '../components/Catalog/SideBar';
import View from '../components/Catalog/View';
import TopBar from '../components/Catalog/TopBar';
import { useParams } from 'react-router-dom';
const Catalog = () => {
  const [docs, setDocs] = useState(undefined)
  const [docsCopy, setDocsCopy] = useState(undefined)
  const [categs, setCategs] = useState(undefined)
  const [brands, setBrands] = useState(undefined)
  const [search, setSearch] = useState([undefined])
  const [loading, setLoading] = useState(false);
  const params = useParams()
  const keywordId = params.id
  const keywordType = params.type

  const changeSearch = (newValue, type) => {
    if (search !== newValue) {
      setSearch([newValue, type])
    } else if (newValue === undefined) {
      setSearch(undefined)
    }
  }

  useEffect(() => {
    const getAllDocs = async () => {
      const data2 = await getDocs(collection(db, "/products/Categories/list"))
      const dataProducts = await getDocs(collection(db, "/products/ProductsInfo/All"))
      setDocs(dataProducts.docs.slice(0, 1000).map((doc) => ({ ...doc.data() })))
      setDocsCopy(dataProducts.docs.slice(0, 1000).map((doc) => ({ ...doc.data() })))
      setCategs(data2.docs)
      const initialBrands = new Set(dataProducts.docs.map(p => p.data().info.brand))
      setBrands(Array.from(initialBrands))
      if (keywordId !== undefined && keywordType !== undefined) {
        let searchKeys = []
        searchKeys.push(keywordId)
        searchKeys.push(keywordType)
        setSearch(searchKeys)
      }
      setLoading(false)
    }
    getAllDocs()
  }, [])

  useEffect(() => {
    if (search[0] === undefined) {
      setDocsCopy(docs)
    } else if (search[1] === "category") {
      setDocsCopy(docs.filter(item => item.info.category === search[0]))
    } else if (search[1] === "brand") {
      setDocsCopy(docs.filter(item => item.info.brand === search[0]))
    }
  }, [search])

  return (
    <div className='relative pt-16 '>
      {categs &&
        <div className='flex border border-red-900 min-h-screen relative' >
          <SideBar categs={categs} brands={brands} search={changeSearch} />
          <div className='border border-green-500 w-full h-full ml-[20%]'>
            <TopBar title={search[0]} />
            {loading
              ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className='border text-3xl text-center pt-16 h-screen animate-pulse'>Loading Products</motion.div>
              : <View items={docsCopy} />
            }

          </div>
        </div>
      }

      {(categs === undefined && docsCopy === undefined) && <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold border'><span>LOADING CATALOG</span></div>}
    </div>
  );
}

export default Catalog;
