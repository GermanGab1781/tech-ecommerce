import React from 'react';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react'
import SideBar from '../components/Catalog/SideBar';
import View from '../components/Catalog/View';
import TopBar from '../components/Catalog/TopBar';

const Catalog = () => {
  const [docs, setDocs] = useState(undefined)
  const [categs, setCategs] = useState(undefined)
  useEffect(() => {
    const getAllDocs = async () => {
      const q = collection(db, "/products/Phones/product")
      const q2 = collection(db, "/products")
      const data = await getDocs(q)
      const data2 = await getDocs(q2)
      /* setDocs(data.docs.map((doc) => ({ ...doc.data() }))) */
      /* get 6 */
      setDocs(data.docs.slice(0, 1000).map((doc) => ({ ...doc.data() })))
      setCategs(data2.docs)
    }
    getAllDocs()
  }, [])

  return (
    <div className='min-h-[100vh] pt-16 '>
      {(categs && docs) &&
        <div className='flex border border-red-900 min-h-screen relative' >
          <SideBar categories={categs} />
          <div className='border border-green-500 w-full h-full ml-[20%]'>
            <TopBar title={"Phones"} />
            <View items={docs} />
          </div>

        </div>
      }

      {(categs === undefined && docs === undefined) && <div className='animate-pulse w-full h-full text-center text-3xl font-bold border'>LOADING CATALOG</div>}
    </div>
  );
}

export default Catalog;
