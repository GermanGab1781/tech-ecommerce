import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { db, storage } from '../../../firebase';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const FirstSlide = () => {
  const docRef = doc(db, "homepage", "carousel")

  const [featured, setFeatured] = useState(undefined)
  const [promoImg, setPromoImg] = useState(undefined)
  const [oldPromoImg, setOldPromoImg] = useState(undefined)
  const [imageChange, setImageChange] = useState(false)

  const [products, setProducts] = useState(undefined)
  const [preview, setPreview] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    const getCarouselDoc = async () => {
      const dataSlide = await getDoc(docRef);
      const q = collection(db, "/products/ProductsInfo/All");
      const dataProducts = await getDocs(q)
      setFeatured(dataSlide.data().first.idFeatured)
      setPromoImg(dataSlide.data().first.imgPromo)
      setProducts(dataProducts.docs)
      setPreview(dataProducts.docs.find(item => item.data().id === dataSlide.data().first.idFeatured))
    }
    getCarouselDoc()
  }, [])

  const handleInput = e => {
    const value = e.target.value
    setFeatured(value)
    setPreview(products.find(item => item.data().id === value))
  }
  const changeImage = (e) => {
    const file = e.currentTarget.files[0]
    const url = URL.createObjectURL(file);
    setOldPromoImg(promoImg)
    setImageChange(true)
    setPromoImg({ Url: url, name: file.name, file })
  }

  const handleUpdate = e => {
    e.preventDefault()
    if (imageChange) {
      const imgRef = ref(storage, oldPromoImg.path)
      /* Delete old image and add new one */
      deleteObject(imgRef).then(() => {
        uploadImage(promoImg).then((res) => {
          updateDoc((docRef), {
            first: {
              idFeatured: featured,
              imgPromo: res
            }
          }).then(() => {
            Swal.fire({ icon: 'success', title: 'First Slide updated', text: 'check homepage' })
          })
        })
      })

    } else {
      updateDoc((docRef), {
        first: {
          idFeatured: featured,
          imgPromo: {
            Url: promoImg.Url,
            path: promoImg.path
          }
        }
      }).then(() => {
        Swal.fire({ icon: 'success', title: 'First Slide updated', text: 'check homepage' })

      })
    }
  }

  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      if (!image) {
        Swal.fire({ icon: 'error', title: 'Image is missing' });
        reject(new Error('Empty image'));
      } else {
        const pathName = `carousel/${image.name + v4()}`;
        const storageRef = ref(storage, pathName);

        uploadBytes(storageRef, image.file)
          .then(() => getDownloadURL(storageRef))
          .then((url) => {
            resolve({ Url: url, path: pathName });
          })
          .catch((error) => {
            // Handle errors from the upload and URL retrieval
            reject(error);
          });
      }
    });
  }

  return (
    <div className='flex flex-col text-center'>
      <NavLink className='fixed left-5 top-[15%]' to="/admin/home/carousel">Go back</NavLink>
      {(featured && preview) &&
        <>
          <form onSubmit={handleUpdate} className='flex flex-col place-items-center gap-y-5 min-h-[30vh]'>
            <label>Featured Gadget</label>
            <select onChange={handleInput} name='idFeatured'>
              {products.map((product, index) => {
                return (
                  <option key={index} value={product.data().id}>
                    {product.data().info.name}
                  </option>
                )
              })}
            </select>
            <label>Promo image</label>
            <input type='file' onChange={changeImage} className='border rounded-xl w-[40%]' />
            <button className='border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold ' type='submit'>Upload</button>
          </form>

          <h2>Preview</h2>
          <motion.div className='bg-red-700 relative w-full h-[80vh] cursor-default grid grid-cols-2 mb-16' >
            {/* col 1 */}
            <div className='relative flex border h-[80vh]'>
              {promoImg &&
                <img src={promoImg.Url} className='w-[80%] h-[80%] border m-auto' />}
            </div>
            {/* col 2 */}
            <div className='relative flex flex-col gap-y-6 justify-center items-center border h-[80vh]'>
              <motion.div >
                Featured Gadget <br />
                {preview.data().info.name}
              </motion.div>
              <img className='h-[55%] w-[40%] border' src={preview.data().images[0].Url} alt={preview.data().info.name} />
              <motion.div className='cursor-pointer'>
                READ MORE
              </motion.div>
            </div>
          </motion.div>
        </>
      }
    </div>
  );
}

export default FirstSlide;
