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
    <div className='flex flex-col border-b-2 border-orange-400 h-screen gap-y-8 py-16 text-center text-white bg-black'>
      <span className='text-4xl'>Admin</span>
      <div className='flex justify-center gap-x-3 ' >
        <NavLink className='border w-1/2 border-orange-400 p-5 text-2xl hover:bg-slate-800 hover:text-white' to="/admin/upload/product">
          New product</NavLink>
        <NavLink className='border md:w-1/4 w-1/3 group border-orange-400 p-5 text-2xl hover:bg-slate-800 hover:text-white' to="/admin/view/product">
          View/<span className='text-green-400 '>Edit</span>/<span className='text-red-400'>Delete</span></NavLink>
      </div>

      <div className='flex justify-center gap-x-3 ' >
        <NavLink className='border w-1/2 border-orange-400 p-5 text-2xl hover:bg-slate-800 hover:text-white' to="/admin/upload/category">
          New Category</NavLink>
        <NavLink className='border md:w-1/4 w-1/3 group border-orange-400 p-5 text-2xl hover:bg-slate-800 hover:text-white' to="/admin/view/category">
          View/<span className='text-green-400 '>Edit</span>/<span className='text-red-400'>Delete</span></NavLink>
      </div>

      <NavLink className='border w-[73%] mx-auto border-orange-400 p-5 text-2xl hover:bg-slate-800 hover:text-white' to="/admin/home">
        Home page Backgrounds</NavLink>

      <span className='cursor-pointer border border-red-400 mx-auto p-3 hover:bg-red-600'
        onClick={() => { signOut(auth); Swal.fire({ icon: 'info', title: 'Sesion terminada' }) }}>
        Log out
      </span>
    </div>
  )
}

export default Admin;
