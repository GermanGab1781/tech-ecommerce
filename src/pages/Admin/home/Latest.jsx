import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../firebase';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NavLink } from 'react-router-dom';



const Latest = () => {

  const [image, setImage] = useState([])
  const [oldImage, setOldImage] = useState(undefined)
  const [imageChange, setImageChange] = useState(false)
  const [title, setTitle] = useState(undefined)
  const docRef = doc(db, "homepage", "latest")

  useEffect(() => {
    const getLatest = async () => {
      const data = await getDoc(docRef);
      setTitle(data.data().title)
      setImage(data.data().image)
    }
    getLatest()
  }, [])

  const changeImage = (e) => {
    const file = e.currentTarget.files[0]
    const url = URL.createObjectURL(file);
    setOldImage(image)
    setImageChange(true)
    setImage({ Url: url, name: file.name, file })
  }
  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      if (!image) {
        Swal.fire({ icon: 'error', title: 'Image is missing' });
        reject(new Error('Empty image'));
      } else {
        const pathName = `latest/${image.name + v4()}`;
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
  const handleUpdate = e => {
    e.preventDefault()
    if (imageChange) {
      const imgRef = ref(storage, oldImage.path)
      /* Delete old image and new one */
      deleteObject(imgRef).then(() => {
        uploadImage(image).then((res) => {
          updateDoc((docRef), {
            title: title,
            image: res
          }).then(() => {
            Swal.fire({ icon: 'success', title: 'Latest section updated', text: 'check homepage' })
          })
        })
      })
    } else {
      updateDoc((docRef), {
        title: title
      }).then(() => {
        Swal.fire({ icon: 'success', title: 'Latest section updated', text: 'check homepage' })
      })
    }
  }


  return (
    <div className='flex flex-col text-center gap-y-5'>
      {title !== undefined &&
        <span>

          <NavLink className='fixed left-5 top-[15%]' to="/admin/home">Go back</NavLink>
          <h1 className='text-4xl'>Change latest Promo image</h1>
          <form onSubmit={handleUpdate} className='flex flex-col gap-y-5 place-items-center border' >
            <label>Title</label>
            <input className='border rounded-xl w-[40%]' defaultValue={title} onChange={(e) => { setTitle(e.currentTarget.value) }} type='text' />
            <label>Image Preview</label>
            <div className='relative cursor-pointer group w-fit h-fit' >
              <img className='h-[70vh] w-[25vw] border-4 border-green-500 ' src={image.Url}></img>
              <div className='absolute -bottom-9 bg-slate-400 p-10 group-hover:bottom-[10%] opacity-0 group-hover:opacity-100 left-1/2 transform -translate-x-1/2 transition-all duration-500'>
                {title}
              </div>
            </div>
            <input className='border py-10' type='file' onChange={changeImage} />
            <button className='border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold ' type='submit'>Upload</button>
          </form>

        </span>
      }
    </div>
  );
}

export default Latest;
