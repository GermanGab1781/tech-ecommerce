import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Upload = () => {
  const [categories, setCategories] = useState(undefined)
  const [pass, setPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

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
      text: 'You need to create at least ONE category to upload a product',
      icon: 'error'
    }).then((result) => {
      if (result.isConfirmed) {
        redirectNotice();
      }
    });
  }



  useEffect(() => {
    const getAllCategories = async () => {
      const q = collection(db, "/products/Categories/list")
      const data = await getDocs(q)
      setCategories(data.docs)
      setLoading(false)
      if (data.docs.length === 0) {
        setPass(false)
      } else {
        setPass(true)
      }
    }
    getAllCategories()
  }, [])

  return (
    <div className='flex flex-col place-items-center gap-y-10 py-5'>
      {console.log(loading)}
      <h1 className='border-b-4 border-green-400 text-5xl'>New Product</h1>
      <form className='flex flex-col w-[70%] place-items-center text-xl'>
        <label>Name</label>
        <input className='border rounded-xl w-[40%]' type='text' required />
        <label>Brand</label>
        <input className='border rounded-xl w-[40%]' type='text' required />
        <label >Price</label>
        <input className='border rounded-xl w-[40%]' type='number' required />
        <div className='flex flex-col w-[40%]'>
          <label className='m-auto'>Category</label>
          <div className='flex place-content-between w-full my-7 gap-y-2 font-bold'>
            <select className='text-center w-[75%]'>
              {(categories && pass) &&
                categories.map((category, index) => {
                  return (
                    <option key={index} value={category.data().name}>{category.data().name}</option>
                  )
                })
              }
            </select>
            <div onClick={redirectNotice} className='flex h-16 w-16 border bg-green-500 ml-1 cursor-pointer rounded-full' >
              <span className='m-auto font-2xl font-bold text-white'>New</span>
            </div>
          </div>
        </div>


        {pass
          ? <button className='border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold ' type='submit'>Upload</button>
          : <button className='border w-1/2 border-black p-5 hover:bg-red-600 text-xl font-bold bg-red-900' onClick={noCategoriesNotice}>Upload</button>
        }

      </form>
    </div>
  );
}

export default Upload;
