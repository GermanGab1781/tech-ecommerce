import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { auth } from '../../firebase';

const Login = () => {
  const [userLogin, setUserLogin] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        Swal.fire({ icon: 'success', title: 'Logueo Exitoso' })
      })
      .catch((err) => {
        Swal.fire({ icon: 'error', title: err })
      })
  }

  return (
    <div className='flex h-[70vh] items-center justify-center place-content-center text-white'>
      <form className='flex flex-col gap-y-2 place-items-center border border-blue-900 text-center w-[80%] p-10 bg-black' onSubmit={handleSignIn}>
        <h1 className='text-4xl font-semibold text-white mb-5'>Admin Page</h1>
        <label className='text-2xl'>Email</label><br />
        <input className='border border-black rounded-md w-[40%] text-black text-center' type="email" id="email" onChange={handleInput} /><br />
        <label className='text-2xl'>Password</label><br />
        <input className='border border-black rounded-md w-[40%] text-black text-center' type="password" id="password" onChange={handleInput} /><br />
        <button className='border p-3 bg-slate-800 hover:bg-orange-400 rounded-md w-[20%]'>Log in</button>
        <div>user:admin@test.com</div>
        <div>password:aREALLYhardPassWORD123</div>
      </form>
    </div>
  )
}

export default Login;
