import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../../firebase';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
const newDocProducto = doc(collection(db, "products/ProductsInfo/All"))

const Edit = () => {

  const [product, setProduct] = useState(undefined)
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [categories, setCategories] = useState(undefined)
  const [pass, setPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const keyword = params.id
  const thisDocRef = doc(db, "products/ProductsInfo/All", keyword)

  useEffect(() => {
    const keyword = params.id
    const getProductDoc = async () => {
      const q = collection(db, "/products/Categories/list")
      const data2 = await getDocs(q)
      /* Categories > 0 Check */
      setCategories(data2.docs)
      if (data2.docs.length === 0) {
        setPass(false)
      } else {
        setPass(true)
      }
      const id = doc(db, "products/ProductsInfo/All", keyword)
      const data = await getDoc(id)
      setProduct(data.data())
      setImages(data.data().images)
    }
    getProductDoc()
  }, [params])

  const handleInput = e => {
    const id = e.target.name
    const value = e.target.value
    setProduct({ ...product, info: { ...product.info, [id]: value } })
    console.log(product)
  }
  const uploadImages = (customMsg) => {
    return new Promise((resolve, reject) => {
      if (newImages.length === 0) {
        Swal.fire({ icon: 'error', title: 'One Image minimum' });
        reject(new Error('Empty images'));
      } else {
        Swal.fire({ icon: 'info', title: 'Uploading images', showConfirmButton: false });
        const Urls = new Array(newImages.length);
        const uploadPromises = newImages.map((image, index) => {
          const pathName = `images/${image.name + v4()}`;
          const storageRef = ref(storage, pathName);
          return uploadBytes(storageRef, image.file)
            .then(() => getDownloadURL(storageRef))
            .then((url) => {
              Urls[index] = { Url: url, path: pathName };
            });
        });

        Promise.all(uploadPromises)
          .then(() => {
            Swal.fire({ icon: 'success', text: customMsg })
            resolve(Urls);
          })
          .catch((error) => {
            // Handle errors from the Promise.all or individual uploads
            reject(error);
          });
      }
    });
  }
  const handleUpdate = e => {
    e.preventDefault()
    Swal.fire({ icon: "info", title: "Subiendo cambios", text: "Porfavor espere", showConfirmButton: false })
    if ((product.info.name === '') || (product.info.name === undefined)) {
      Swal.fire({ icon: 'error', title: 'Falta el nombre' })
      return
    } else if ((product.info.brand === '') || (product.info.brand === undefined)) {
      Swal.fire({ icon: 'error', title: 'Falta la Descripcion' })
      return
    } else if ((product.info.price === '') || (product.info.price === undefined)) {
      Swal.fire({ icon: 'error', title: 'Falta la stock' })
      return
    } else if (newImages.length > 0) {
      uploadImages().then((res) => {
        let newImgsSrc = [...images, ...res]
        updateDoc((thisDocRef), {
          info: product.info,
          images: newImgsSrc
        }).then(() => {
          Swal.fire({ icon: 'success', title: 'Producto actualizado', text: 'ir a catalogo para ver cambios' })
        })
      })
    } else {
      console.log(product.info)
      updateDoc((thisDocRef), {
        info: product.info
      }).then(() => {
        window.scrollTo(0, 0);
        navigate('/admin/view/product');

        Swal.fire({ icon: 'success', title: product.info.name + ' Updated', text: 'Redirecting' })

      })
    }

  }
  const redirectNotice = () => {
    Swal.fire({
      title: 'Redirecting to "Create Category" page',
      text: 'Typed data wont be saved',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/admin/upload/category');
      }
    });
  }
  const noCategoriesNotice = () => {
    Swal.fire({
      title: 'No categories created',
      text: 'You need to create at least ONE category to upload a product, press confirm to redirect',
      icon: 'error'
    }).then((result) => {
      if (result.isConfirmed) {
        redirectNotice();
      }
    });
  }
  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files
    const arrayImages = []
    Object.keys(files).forEach((i) => {
      const file = files[i]
      let url = URL.createObjectURL(file);
      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file
      })
      indexInicial++
    })
    return arrayImages
  }
  function deleteImg(index) {
    const newImgs = newImages.filter(function (element) {
      return element.index !== index
    })
    setNewImages(newImgs)
  }
  const deleteImage = (path) => {
    if (images.length === 1) {
      Swal.fire({ icon: 'error', title: 'Cant delete', text: 'Product needs minimum 1 image, add another to delete this' })
      return
    }
    Swal.fire({
      title: 'Delete image???',
      text: 'This change will be executed now',
      icon: 'question',
      showDenyButton: true,
      denyButtonText: 'NO',
      showConfirmButton: true,
      confirmButtonText: 'YES',
    }).then((result) => {
      if (result.isConfirmed === true) {
        const imgRef = ref(storage, path)
        let newArray = images.filter(img => img.path !== path)
        deleteObject(imgRef).then(() => {
          updateDoc(thisDocRef, {
            images: newArray
          })
          setImages(newArray)
        })
      }
    })
  }

  const changeInput = (e) => {
    let indexImg;
    if (newImages.length > 0) {
      indexImg = newImages[newImages.length - 1].index + 1;
    } else {
      indexImg = images.length;
    }
    if ((newImages.length + images.length) >= 5) {
      alert('Only 5 permitted, delete one to proceed')
    } else {
      let newImgsToState = readmultifiles(e, indexImg);
      let newImgsState = [...newImages, ...newImgsToState];
      setNewImages(newImgsState);
    }


  };

  return (
    <div className='flex place-content-center'>
      <NavLink className='fixed left-5' to="/admin/view/product">Go back</NavLink>
      {product && categories
        ? <div>
          {product.info.name}
          <div className='flex flex-col place-items-center gap-y-10 py-5'>
            <h1 className='border-b-4 border-green-400 text-5xl'>Edit Product</h1>
            <form onSubmit={handleUpdate} className='flex flex-col w-[80%] place-items-center text-xl'>
              {/* Name */}
              <label>Name</label>
              <input className='border rounded-xl w-[40%]' onChange={handleInput} defaultValue={product.info.name} name='name' type='text' required />
              {/* Brand */}
              <label>Brand</label>
              <input className='border rounded-xl w-[40%]' onChange={handleInput} defaultValue={product.info.brand} name='brand' type='text' required />
              {/* Price */}
              <label >Price</label>
              <input className='border rounded-xl w-[40%]' onChange={handleInput} defaultValue={product.info.price} name='price' type='number' required />
              <div className='flex flex-col w-[40%]'>
                {/* Category */}
                <label className='m-auto'>Category</label>
                <div className='flex place-content-between w-full my-7 gap-y-2 font-bold'>
                  <select className='text-center w-[75%]' onChange={handleInput} defaultValue={product.info.category} name='category' >
                    <option value="">Select</option>
                    {(categories && pass) &&
                      categories.map((category, index) => {
                        return (
                          <option key={index} value={category.data().name}>{category.data().name}</option>
                        )
                      })
                    }
                  </select>
                  {/* Redirect to New Category */}
                  <div onClick={redirectNotice} className='flex h-16 w-16 border bg-green-500 ml-1 cursor-pointer rounded-full' >
                    <span className='m-auto font-2xl font-bold text-white'>New</span>
                  </div>
                </div>
              </div>

              {/* Images */}
              {/* Already uploaded Images */}
              <div className='my-12'>
                <label className='text-2xl font-bold '>{product.info.name} images</label>
                <div className='flex gap-x-5 place-content-center'>
                  {images.map((image, index) => {
                    return (
                      <div key={index}>
                        <img className='w-40 h-40' src={image.Url} alt='Loading' />
                        <span className='cursor-pointer bg-red-600 p-5 font-bold' onClick={() => deleteImage(image.path)}>DELETE</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Add more Images */}
              <label className='text-2xl font-bold'>Images (1-5)</label>
              <div className=' flex flex-col place-items-center border border-teal-500 p-20 w-[75%]'>
                <input className='border' type="file" onChange={changeInput} />
                <div className='flex flex-row flex-wrap place-content-center gap-x-5 gap-y-7 p-5'>
                  {newImages.map((image) => {
                    return (
                      <div className='relative w-fit h-fit' key={image.index}>
                        <img className='h-32 w-32' src={image.url} alt='Cargando' />
                        <button className='absolute -bottom-3 bg-slate-500' onClick={deleteImg.bind(this, image.index)}>BORRAR IMAGEN</button>
                        <span className='absolute bg-green-700 p-1 -top-2 -right-2'>{image.index + 1}</span>
                      </div>
                    )
                  })}
                </div>
              </div>


              {pass
                ? <button className='border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold ' type='submit'>Upload</button>
                : <button className='border w-1/2 border-black p-5 hover:bg-red-600 text-xl font-bold bg-red-900' onClick={noCategoriesNotice}>Upload</button>
              }

            </form>
          </div>
        </div>
        : <div></div>
      }
    </div>
  );
}

export default Edit;
