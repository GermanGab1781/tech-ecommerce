import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react'
import SideBar from '../components/Catalog/SideBar';
import View from '../components/Catalog/View';
import { useParams } from 'react-router-dom';
const Catalog = () => {
  const [docs, setDocs] = useState(undefined)
  const [docsCopy, setDocsCopy] = useState(undefined)
  const [categs, setCategs] = useState(undefined)
  const [brands, setBrands] = useState(undefined)
  const [search, setSearch] = useState([undefined])
  const params = useParams()
  const keywordId = params.id
  const keywordType = params.type
  const [currentPage, setCurrentPage] = useState(1);

  const changeSearch = (newValue, type) => {
    if (search !== newValue) {
      setSearch([newValue, type])
    } else if (newValue === undefined) {
      setSearch(undefined)
    }
  }
  useEffect(() => { window.scroll(0, 1); }, [currentPage])

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
    setCurrentPage(1)
  }, [search])


  const isDataLoaded = categs && docsCopy;
  return (
    <div className='relative font-semibold bg-slate-800 mt-5'>
      {isDataLoaded ?
        (
          <div className='flex md:flex-row flex-col min-h-screen relative' >
            <SideBar categs={categs} brands={brands} search={changeSearch} />
            <div className='w-full h-full min-h-screen'>
              <View items={docsCopy} title={search[0]} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
          </div>
        )
        /* Loading page */
        :
        (
          <div className='relative bg-transparent w-full h-screen text-4xl text-center animate-pulse'>
            <span className='absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white'>Fine-tuning our digital storefront for an exceptional experience...</span>
          </div>
        )}
    </div>
  );
}

export default Catalog;
