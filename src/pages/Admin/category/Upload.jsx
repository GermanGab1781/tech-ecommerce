import React, { useState } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from "../../../firebase";
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const Upload = () => {

  const [nameC, setNameC] = useState(undefined)
  const [uploading, setUploading] = useState(false)
  const newCategory = doc(collection(db, "products/Categories/list"))

  const handleAdd = e => {
    e.preventDefault();
    const msg = "Uploaded category ==> "
    if (nameC === undefined || nameC === '') {
      Swal.fire({ icon: 'error', title: 'It needs a name' })
      return
    }
    setUploading(true)
    Swal.fire({ icon: 'info', title: 'Uploading', showConfirmButton: false, showCloseButton: false })
    setDoc((newCategory), ({ name: nameC }))
      .then(
        setUploading(false),
        Swal.fire({ icon: 'success', text: msg + nameC }),
        e.target.name.value = ''
      )
  }

  const handleInput = e => {
    const n = e.target.value
    setNameC(n)
  }

  return (
    <div className='flex flex-col place-items-center py-5 gap-y-10 text-white bg-black min-h-screen'>
      <NavLink className='fixed md:left-5 left-0 p-1 bg-slate-800 border-orange-400 border text-2xl z-20 text-white' to="/Admin">Go back</NavLink>
      <h1 className='border-b-4 border-green-400 text-5xl'>New Category</h1>
      <form className='flex flex-col w-[40%] place-items-center gap-y-2' onSubmit={handleAdd}>
        <label className='text-xl place-self-start mb-2'>Name</label>
        <input id='name' name='name' onChange={handleInput} type='text' className='border rounded-xl w-full text-black text-2xl' />
        <button className={uploading
          ? 'border w-1/2 border-black bg-slate-600 p-5 text-xl font-bold'
          : 'border md:w-[70%] w-1/2 border-orange-400 p-5 mt-5 hover:bg-slate-800 hover:text-white text-xl font-bold '} type='submit' disabled={uploading}>Upload</button>
      </form>

    </div>
  );
}

export default Upload;
