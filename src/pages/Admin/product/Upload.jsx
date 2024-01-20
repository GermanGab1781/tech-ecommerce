import { collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useState, useEffect } from 'react'
import { db, storage } from '../../../firebase'
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';

const Upload = () => {
  const [categories, setCategories] = useState(undefined)
  const [images, setImages] = useState([])
  const [pass, setPass] = useState(false)
  const navigate = useNavigate()
  const newDocProducto = doc(collection(db, "products/ProductsInfo/All"))

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    category: '',
  })

  const handleInput = e => {
    const id = e.target.name
    const value = e.target.value
    setProduct({ ...product, [id]: value })
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

  const uploadImages = (customMsg) => {
    return new Promise((resolve, reject) => {
      if (images.length === 0) {
        Swal.fire({ icon: 'error', title: 'Subir mínimo una imagen' });
        reject(new Error('Imagenes Vacias'));
      } else {
        Swal.fire({ icon: 'info', title: 'Archivo subiendo', showConfirmButton: false });
        const Urls = new Array(images.length);
        const uploadPromises = images.map((image, index) => {
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

  const handleUpload = e => {
    e.preventDefault()
    if ((product.name === '') || (product.name === undefined)) {
      Swal.fire({ icon: 'error', title: 'Name is missing' })
      return
    } else if ((product.brand === '') || (product.brand === undefined)) {
      Swal.fire({ icon: 'error', title: 'Brand is missing' })
      return
    } else if ((product.price === '') || (product.price === undefined)) {
      Swal.fire({ icon: 'error', title: 'Price is missing' })
      return
    } else if ((product.price < 0)) {
      Swal.fire({ icon: 'error', title: 'Price must be greater than 0' })
      return
    } else if ((product.category === '') || (product.category === undefined)) {
      Swal.fire({ icon: 'error', title: 'Category is missing' })
      return
    } else if ((product.description === '') || (product.description === undefined)) {
      Swal.fire({ icon: 'error', title: 'Description is missing' })
      return
    }
    const customMsg = product.name + ' Uploaded';
    uploadImages(customMsg)
      .then((res) => {
        setDoc((newDocProducto), { id: newDocProducto.id, info: product, images: res, timestamp: serverTimestamp() })
          .then(() => {
            setProduct({ name: '', brand: '', price: '', category: '', description: '' })
            setImages([])
          })
      })
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
    const newImgs = images.filter(function (element) {
      return element.index !== index
    })
    setImages(newImgs)
  }

  const changeInput = (e) => {
    const fileName = e.target.files[0].name
    /* Get the type, check in case it has multiple Dots Example: this.image.has.dots.JPG */
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      const fileExtension = fileName.substring(lastDotIndex + 1).toLowerCase();
      if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif' || fileExtension === 'bmp' || fileExtension === 'webp' || fileExtension === 'svg') {
        let indexImg;
        if (images.length > 0) {
          indexImg = images[images.length - 1].index + 1;
        } else {
          indexImg = 0;
        }
        if (images.length >= 5) {
          alert('Only 5 permitted, delete one to proceed')
        } else {
          let newImgsToState = readmultifiles(e, indexImg);
          let newImgsState = [...images, ...newImgsToState];
          setImages(newImgsState);
        }

      } else {
        Swal.fire({ icon: 'error', title: 'That file is not an image!!!' });
      }
    }
  };



  useEffect(() => {
    const getAllCategories = async () => {
      const q = collection(db, "/products/Categories/list")
      const data = await getDocs(q)
      setCategories(data.docs)
      if (data.docs.length === 0) {
        setPass(false)
      } else {
        setPass(true)
      }
    }
    getAllCategories()
  }, [])

  return (
    <div className='flex flex-col place-items-center gap-y-10 py-5 bg-black text-white '>
      <NavLink className='fixed md:left-5 left-0 p-1 bg-slate-800 border-orange-400 border text-2xl text-white' to="/Admin">Go back</NavLink>
      <h1 className='border-b-4 mt-5 border-green-400 text-5xl'>New Product</h1>
      <form onSubmit={handleUpload} className='flex flex-col md:w-[40%] w-[95%] place-items-center text-xl'>
        {/* Name */}
        <label className='place-self-start'>Name</label>
        <input className='border rounded-xl w-full text-black mb-5' onChange={handleInput} value={product.name} name='name' type='text' required />
        {/* Brand */}
        <label className='place-self-start'>Brand</label>
        <input className='border rounded-xl w-full text-black mb-5' onChange={handleInput} value={product.brand} name='brand' type='text' required />
        {/* Price */}
        <label className='place-self-start'>Price</label>
        <input className='border rounded-xl w-full text-green-600 mb-5 ' onChange={handleInput} value={product.price} name='price' type='number' required />
        {/* Description */}
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
        <textarea className='border rounded-xl w-full text-black mb-5' onChange={handleInput} value={product.description} rows={10} cols={5} name='description' type='text' required />
        <div className='flex flex-col w-full'>
          {/* Category */}
          <label className=''>Category</label>
          <div className='flex place-content-between w-full my-6 gap-y-2 font-bold'>
            <select className='text-center w-[75%] bg-slate-800' onChange={handleInput} value={product.category} name='category' >
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
        <label className='text-2xl font-bold'>Images (1-5)</label>
        <div className=' flex flex-col place-items-center border border-teal-500 p-20 w-[90vw]'>
          <input accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, image/svg+xml" className='border' type="file" onChange={changeInput} />
          <div className='flex flex-row flex-wrap place-content-center gap-x-5 gap-y-7 p-5'>
            {images.map((image) => {
              return (
                <div className='relative w-fit h-fit' key={image.index}>
                  <img className='h-32 w-32' src={image.url} alt='owo' />
                  <button className='absolute left-1/2 transform -translate-x-1/2 -bottom-3 bg-red-500' onClick={deleteImg.bind(this, image.index)}>DELETE</button>
                  <span className='absolute bg-green-700 p-1 -top-2 -right-2'>{image.index + 1}</span>
                </div>
              )
            })}
          </div>
        </div>


        {pass
          ? <button className='border md:w-[70%] w-1/2 border-orange-400 p-5 mt-5 hover:bg-slate-800 hover:text-white text-xl font-bold ' type='submit'>Upload</button>
          : <button className='border md:w-[70%] w-1/2 border-orange-400 p-5 mt-5 text-xl font-bold bg-red-900' onClick={noCategoriesNotice}>Upload</button>
        }

      </form>
    </div>
  );
}

export default Upload;
