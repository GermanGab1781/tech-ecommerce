import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { db, storage } from '../../../firebase';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const Carousel = () => {
  const docRef = doc(db, "homepage", "carousel")
  const [image1, setImage1] = useState(undefined)
  const [image2, setImage2] = useState(undefined)
  const [image3, setImage3] = useState(undefined)
  const [imageChange1, setImageChange1] = useState(false)
  const [imageChange2, setImageChange2] = useState(false)
  const [imageChange3, setImageChange3] = useState(false)
  const [oldImage1, setOldImage1] = useState(false)
  const [oldImage2, setOldImage2] = useState(false)
  const [oldImage3, setOldImage3] = useState(false)

  useEffect(() => {
    const getCarouselDoc = async () => {
      const data = await getDoc(docRef);
      setImage1(data.data().image1)
      setImage2(data.data().image2)
      setImage3(data.data().image3)
      if (data.data().image1.Url !== "") {
        setOldImage1(true)
      }
      if (data.data().image2.Url !== "") {
        setOldImage2(true)
      }
      if (data.data().image3.Url !== "") {
        setOldImage3(true)
      }
    }
    getCarouselDoc()
  }, [])

  const changeImage = (e) => {
    const file = e.currentTarget.files[0]
    const url = URL.createObjectURL(file);
    const id = e.currentTarget.name
    if (id === "first") {
      /* We always keep the info of the image that is already in firebase */
      if (image1.path !== undefined) {
        setOldImage1(image1)
      }
      setImageChange1(true)
      setImage1({ Url: url, name: file.name, file })
      console.log(oldImage1)
    }
    else if (id === "second") {
      if (image2.path !== undefined) {
        setOldImage2(image2)
      }
      setImageChange2(true)
      setImage2({ Url: url, name: file.name, file })

    }
    else if (id === "third") {
      if (image3.path !== undefined) {
        setOldImage3(image3)
      }
      setImageChange3(true)
      setImage3({ Url: url, name: file.name, file })
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const id = e.currentTarget.id
    if (id === "first") {
      if (oldImage1.path !== undefined) {
        if (imageChange1) {
          const imgRef = ref(storage, oldImage1.path)
          console.log(oldImage1)
          /* Delete old image to add the new one */
          deleteObject(imgRef).then(() => {
            uploadImage(image1).then((res) => {
              updateDoc((docRef), {
                image1: res
              }).then(() => {
                Swal.fire({ title: "First Background image uploaded", icon: "success" })
                setImageChange1(false)
                setImage1(res)
              })
            })
          })
        }
      } else {
        if (image1.Url !== "" && image1 !== undefined)
          /* Add image */
          uploadImage(image1).then((res) => {
            updateDoc((docRef), {
              image1: res
            }).then(() => {
              Swal.fire({ title: "First Background image uploaded", icon: "success" })
            })
          })
      }
    } else if (id === "second") {
      if (oldImage2.path !== undefined) {
        if (imageChange2) {
          const imgRef = ref(storage, oldImage2.path)
          /* Delete old image to add the new one */
          deleteObject(imgRef).then(() => {
            uploadImage(image2).then((res) => {
              updateDoc((docRef), {
                image2: res
              }).then(() => {
                Swal.fire({ title: "Second Background image uploaded", icon: "success" })
                setImageChange2(false)
                setImage2(res)
              })
            })
          })
        }
      } else {
        if (image2.Url !== "" && image2 !== undefined)
          /* Add image */
          uploadImage(image2).then((res) => {
            updateDoc((docRef), {
              image2: res
            }).then(() => {
              Swal.fire({ title: "Second Background image uploaded", icon: "success" })
            })
          })
      }
    } else if (id === "third") {
      if (oldImage3.path !== undefined) {
        if (imageChange3) {
          const imgRef = ref(storage, oldImage3.path)
          /* Delete old image to add the new one */
          deleteObject(imgRef).then(() => {
            uploadImage(image3).then((res) => {
              updateDoc((docRef), {
                image3: res
              }).then(() => {
                Swal.fire({ title: "Third Background image uploaded", icon: "success" })
                setImageChange3(false)
                setImage3(res)
              })
            })
          })
        }
      } else {
        if (image3.Url !== "" && image3 !== undefined)
          /* Add image */
          uploadImage(image3).then((res) => {
            updateDoc((docRef), {
              image3: res
            }).then(() => {
              Swal.fire({ title: "Third Background image uploaded", icon: "success" })
            })
          })
      }
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
    <div className='text-center'>

      {/* First Image */}
      <form id="first" className='flex flex-col gap-y-10 place-items-center' onSubmit={handleUpdate}>
        <div>
          <div className="text-2xl">First Image</div>
          <input onChange={changeImage} name='first' type='file' />
          <div>Preview</div>
          {(image1 && image1.Url !== "")
            ? <div className='relative h-[65vh] w-screen border'>
              <img src={image1.Url} className='bg-contain h-[65vh] w-full' alt='Image 1 for homepage background' />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>
            : <div className='border border-red-500 p-20 w-full m-auto'>Image 1 Not defined Please upload</div>
          }
        </div>
        <button className='border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold ' type='submit'>Upload</button>
      </form>
      {/* Second Image */}
      <form id="second" className='flex flex-col gap-y-10 place-items-center' onSubmit={handleUpdate}>
        <div>
          <div className="text-2xl">Second Image</div>
          <input onChange={changeImage} name='second' type='file' />
          <div>Preview</div>
          {(image2 && image2.Url !== "")
            ? <div className='relative h-[65vh] w-screen border'>
              <img src={image2.Url} className='bg-contain h-[65vh] w-full' alt='Image 2 for homepage background' />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>
            : <div className='border border-red-500 p-20 w-full m-auto'>Image 2 Not defined Please upload</div>
          }
        </div>
        <button className='border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold ' type='submit'>Upload</button>
      </form>
      {/* Third Image */}
      <form id="third" className='flex flex-col gap-y-10 place-items-center' onSubmit={handleUpdate}>
        <div>
          <div className="text-2xl">Third Image</div>
          <input onChange={changeImage} name='third' type='file' />
          <div>Preview</div>
          {(image3 && image3.Url !== "")
            ? <div className='relative h-[65vh] w-screen border'>
              <img src={image3.Url} className='bg-contain h-[65vh] w-full' alt='Image 3 for homepage background' />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>
            : <div className='border border-red-500 p-20 w-full m-auto'>Image 3 Not defined Please upload</div>
          }
        </div>
        <button className='border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold ' type='submit'>Upload</button>
      </form>
    </div >
  );
}

export default Carousel;
