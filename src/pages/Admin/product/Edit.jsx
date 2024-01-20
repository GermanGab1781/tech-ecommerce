import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../../firebase';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const Edit = () => {

  const [product, setProduct] = useState(undefined)
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [categories, setCategories] = useState(undefined)
  const [pass, setPass] = useState(false)

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
            resolve(Urls);
          })
          .catch((error) => {
            console.log(error)
            reject(error);
          });
      }
    });
  }
  const handleUpdate = e => {
    e.preventDefault()
    Swal.fire({ icon: "info", title: "Uploading", text: "Please wait", showConfirmButton: false })
    if ((product.info.name === '') || (product.info.name === undefined)) {
      Swal.fire({ icon: 'error', title: 'Name missing' })
      return
    } else if ((product.info.brand === '') || (product.info.brand === undefined)) {
      Swal.fire({ icon: 'error', title: 'Description missing' })
      return
    } else if ((product.info.price === '') || (product.info.price === undefined)) {
      Swal.fire({ icon: 'error', title: 'Stock missing' })
      return
    } else if (newImages.length > 0) {
      uploadImages().then((res) => {
        let newImgsSrc = [...images, ...res]
        updateDoc((thisDocRef), {
          info: product.info,
          images: newImgsSrc
        }).then(() => {
          Swal.fire({ icon: 'success', title: 'Product updated' })
          navigate('/admin/view/product');
        })
      })
    } else {
      updateDoc((thisDocRef), {
        info: product.info
      }).then(() => {
        window.scrollTo(0, 0);
        navigate('/admin/view/product');
        Swal.fire({ icon: 'success', title: product.info.name + ' Updated', text: 'Redirecting' })
      })
    }

  }
  const copySymbol = () => {
    const tempInput = document.createElement('input');
    tempInput.value = '|';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    Swal.fire({ title: 'Symbol copied!!', text: 'You can use Ctrl+V to paste it or Second Click then Paste' })
  };
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
    const fileName = e.target.files[0].name
    /* Get the type, check in case it has multiple Dots Example: this.image.has.dots.JPG */
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      const fileExtension = fileName.substring(lastDotIndex + 1).toLowerCase();
      if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif' || fileExtension === 'bmp' || fileExtension === 'webp' || fileExtension === 'svg') {

        let indexImg;
        if (newImages.length > 0) {
          indexImg = newImages[newImages.length - 1].index + 1;
        } else {
          indexImg = 0;
        }
        if ((newImages.length + images.length) >= 5) {
          Swal.fire({ title: 'Only 5 images allowed', text: 'Delete one to proceed', icon: 'error' })
        } else {
          let newImgsToState = readmultifiles(e, indexImg);
          let newImgsState = [...newImages, ...newImgsToState];
          setNewImages(newImgsState);
        }

      } else {
        Swal.fire({ icon: 'error', title: 'That file is not an image!!!' });
      }
    }
  };

  return (
    <div className='flex place-content-center text-white bg-black'>
      <NavLink className='fixed md:left-5 left-0 p-1 bg-slate-800 border-orange-400 border text-2xl text-white' to="/admin/view/product">Go back</NavLink>
      {product && categories
        ?
        <div className='flex flex-col place-items-center gap-y-10 py-5'>
          <h1 className='border-b-4 border-green-400 text-5xl'>Edit Product</h1>
          <h2 className='border-b-4 border-green-400 text-3xl'>{product.info.name}</h2>
          <form onSubmit={handleUpdate} className='flex flex-col md:w-[44%] w-[99%] place-items-center text-xl'>
            {/* Name */}
            <label className='place-self-start'>Name</label>
            <input className='border rounded-xl w-full text-black mb-5' onChange={handleInput} defaultValue={product.info.name} name='name' type='text' required />
            {/* Brand */}
            <label className='place-self-start'>Brand</label>
            <input className='border rounded-xl w-full text-black mb-5' onChange={handleInput} defaultValue={product.info.brand} name='brand' type='text' required />
            <label className='place-self-start'>Description</label>
            <span className='flex flex-col border my-2 p-2 bg-slate-700 text-sm'>
              <p className='text-orange-400'>If you want to do a line break use symbol <span className='text-md'>" | "</span></p>
              <p>For example "1Example text | 2Example" would create this:</p>
              <p>"1Example text"</p>
              <p>"2Example"</p>
              <div className='border p-1 m-auto bg-slate-900 border-orange-400 cursor-pointer' onClick={copySymbol}>
                Copy Pipe Symbol (|)
              </div>
            </span>

            <textarea className='border rounded-xl w-full text-black mb-5' onChange={handleInput} value={product.info.description} rows={10} cols={1} name='description' type='text' required />
            {/* Price */}
            <label className='place-self-start' >Price</label>
            <input className='border rounded-xl w-full text-green-600 mb-5' onChange={handleInput} defaultValue={product.info.price} name='price' type='number' required />
            <div className='flex flex-col w-full'>
              {/* Category */}
              <label>Category</label>
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
            <div className='flex flex-col my-12'>
              <label className='text-2xl font-bold mx-auto'> Already Uploaded Images</label>
              <div className='flex flex-wrap mt-5 gap-5 gap-y-16 place-content-center border border-white'>
                {images.map((image, index) => {
                  return (
                    <div className='relative ' key={index}>
                      <img className='w-40 h-40' src={image.Url} alt='Loading' />
                      <span className='absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-red-600 p-5 font-bold' onClick={() => deleteImage(image.path)}>DELETE</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Add more Images */}
            <label className='text-2xl font-bold mt-2'>Images (1-5)</label>
            <div className=' flex flex-col place-items-center border border-teal-500 p-20 w-[90vw]'>
              <input accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/svg+xml" className='border' type="file" onChange={changeInput} />
              <div className='flex flex-row flex-wrap place-content-center gap-x-5 gap-y-7 p-5'>
                {newImages.map((img) => {
                  return (
                    <div className='relative w-fit h-fit' key={img.index}>
                      <img className='h-32 w-32' src={img.url} alt='Cargando' />
                      <button className='absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-red-600 p-2 font-bold' onClick={deleteImg.bind(this, img.index)}>DELETE</button>
                      <span className='absolute bg-green-700 p-1 -top-2 -right-2'>{img.index + 1}</span>
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

        : <div></div>
      }
    </div>
  );
}

export default Edit;
