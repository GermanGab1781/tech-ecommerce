import React, { useState } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from "../../../firebase";
import Swal from 'sweetalert2';

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
    <div className='flex flex-col place-items-center py-5 gap-y-10'>
      <h1 className='border-b-4 border-green-400 text-5xl'>New Category</h1>
      <form className='flex flex-col w-[70%] place-items-center gap-y-2' onSubmit={handleAdd}>
        <label className='text-xl'>Name</label>
        <input id='name' name='name' onChange={handleInput} type='text' className='border rounded-xl w-[40%]' />
        <button className={uploading
          ? 'border w-1/2 border-black bg-slate-600 p-5 text-xl font-bold'
          : 'border w-1/2 border-black p-5 hover:bg-black hover:text-white text-xl font-bold '} type='submit' disabled={uploading}>Upload</button>
      </form>
    </div>
  );
}

export default Upload;
