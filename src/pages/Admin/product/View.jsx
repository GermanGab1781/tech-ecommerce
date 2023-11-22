import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { db, storage } from '../../../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import ItemProduct from '../../../components/Admin/ItemProduct';
import Swal from 'sweetalert2';
import { deleteObject, ref } from 'firebase/storage';

const View = () => {
  const [products, setProducts] = useState(undefined)

  useEffect(() => {
    const getAllDocs = async () => {
      const q = collection(db, "/products/ProductsInfo/All")
      const data = await getDocs(q)
      setProducts(data.docs)
    }
    getAllDocs()
  }, [])

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
    <div>
      <NavLink className='fixed left-5' to="/Admin">Go back</NavLink>
      {products
        ? <div className='flex flex-wrap py-10 gap-10 place-content-center'>
          {products.map((item, index) => {
            return (
              <ItemProduct key={index} info={item} del={() => { deleteDocument(item.data().id, item.data().images, item.data().info.name) }} />
            )
          })}
        </div>
        : <div></div>}
    </div>
  );
}

export default View;
