import React from 'react';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react'

const Catalog = () => {
  const [docs, setDocs] = useState(undefined)
  useEffect(() => {
    const getAllDocs = async () => {
      const q = collection(db, "/products/Phones/product")
      const data = await getDocs(q)
      /* setDocs(data.docs.map((doc) => ({ ...doc.data() }))) */
      /* get 6 */
      setDocs(data.docs.slice(0, 6).map((doc) => ({ ...doc.data() })))
      console.log(data.docs.length)
    }
    getAllDocs()
  }, [])

  return (
    <div className='h-[100vh] pt-36'>
      {docs &&
        docs.map((doc, index) => {
          return (
            <div key={index} className='border w-[10vw] h-[10vh]'>
              <span>{doc.name}</span>
              <span>{doc.brand}</span>
              <span>{doc.price}</span>
            </div>
          )
        })

      }
    </div>
  );
}

export default Catalog;
