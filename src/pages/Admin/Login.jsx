import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { auth } from '../../firebase';

const Login = () => {
  const [userLogin, setUserLogin] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 1);
  }, [])

  const handleInput = e => {
    const id = e.target.id
    const value = e.target.value
    setUserLogin({ ...userLogin, [id]: value })
  }

  const handleSignIn = e => {
    e.preventDefault()
    if (userLogin === undefined) {
      Swal.fire({ icon: 'error', title: 'Write email and password :P' })
      return
    } else if (userLogin.email === undefined) {
      Swal.fire({ icon: 'error', title: 'Missing email' })
      return
    } else if (userLogin.password === undefined) {
      Swal.fire({ icon: 'error', title: 'Missing password' })
      return
    }

    signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
      .then(() => {
        Swal.fire({ icon: 'success', title: 'Logged in' })
      })
      .catch((err) => {
        Swal.fire({ icon: 'error', title: err })
      })
  }

  return (
    <div className='flex mt-5 items-center justify-center place-content-center text-white'>
      <form className='flex flex-col gap-y-2 place-items-center border border-blue-900 text-center md:w-[80%] p-10 bg-black' onSubmit={handleSignIn}>
        <h1 className='text-4xl font-semibold text-white mb-5'>Admin Page</h1>
        <label className='text-2xl'>Email</label><br />
        <input className='border border-black rounded-md md:w-[40%] w-[90%] text-black text-center' type="email" id="email" onChange={handleInput} /><br />
        <label className='text-2xl'>Password</label><br />
        <input className='border border-black rounded-md md:w-[40%] w-[90%] text-black text-center' type="password" id="password" onChange={handleInput} /><br />
        <button className='border p-3 bg-slate-800 hover:bg-orange-400 rounded-md md:w-[20%] w-1/2'>Log in</button>
        <div className='text-3xl whitespace-nowrap mt-10 border hover:border-orange-400 p-10 bg-orange-400 hover:bg-slate-800 cursor-pointer' onClick={() => { window.scroll(200, 300) }}>For access contact me</div>
      </form>
    </div>
  )
}

export default Login;
