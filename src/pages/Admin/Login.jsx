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
    console.log(userLogin)
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
    <div className='flex items-center justify-center border place-content-center '>
      <form className='border text-center w-[80%] p-10' onSubmit={handleSignIn}>
        <label className=''>Email</label><br />
        <input className='border border-black' type="email" id="email" onChange={handleInput} /><br />
        <label className=''>Password</label><br />
        <input className='border border-black' type="password" id="password" onChange={handleInput} /><br />
        <button className='border p-3 hover:bg-green-600'>Log in</button>
        <div>user:admin@test.com</div>
        <div>password:aREALLYhardPassWORD123</div>
      </form>
    </div>
  )
}

export default Login;
