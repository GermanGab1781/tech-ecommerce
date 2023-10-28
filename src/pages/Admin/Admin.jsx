import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import Swal from 'sweetalert2'

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className='flex flex-col py-36 gap-y-8 text-center px-16'>
      <span className='text-4xl'>Admin</span>

      <div className='flex justify-center gap-x-3' >
        <NavLink className='border w-1/2 border-black p-5 hover:bg-black hover:text-white' to="/admin/upload/product">
          Upload product</NavLink>
        <NavLink className='border w-1/4 border-black p-5 hover:bg-black hover:text-white' to="/admin/view/product">
          View/Edit/Delete</NavLink>
      </div>

      <div className='flex justify-center gap-x-3' >
        <NavLink className='border w-1/2 border-black p-5 hover:bg-black hover:text-white' to="/admin/upload/category">
          New Category</NavLink>
        <NavLink className='border w-1/4 border-black p-5 hover:bg-black hover:text-white' to="/admin/view/category">
          View/Edit/Delete</NavLink>
      </div>
      <NavLink className='border w-[77%] m-auto border-black p-5 hover:bg-black hover:text-white' to="/admin/home">
        Home page changes</NavLink>

      <span className='cursor-pointer border border-black m-auto p-3 hover:bg-red-600'
        onClick={() => { signOut(auth); Swal.fire({ icon: 'info', title: 'Sesion terminada' }) }}>
        Log out
      </span>
    </div>
  )
}

export default Admin;
