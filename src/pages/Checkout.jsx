import React, { useContext, useEffect, useState } from 'react';
import { BsCartXFill, BsCartPlusFill } from "react-icons/bs";
import { CartContext } from '../contexts/ShoppingCartContext';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const Checkout = () => {
  const { cart, removeFromCart, total, addToCart } = useContext(CartContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  useEffect(() => {
    window.scroll(0, 1)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Here goes whatever payment method you choose',
      text: 'NAME: ' + name + ' EMAIL: ' + email + ' ADDRESS: ' + address + ' PAYMENTMETHOD: ' + paymentMethod,
      icon: 'success'
    })
  };

  return (
    <div>
      {cart.length > 0
        ?
        <div className='flex flex-col text-white min-h-screen place-items-center m-auto bg-slate-800 border-2 border-orange-400'>
          <h1 className='border text-3xl p-5 my-4 font-semibold bg-blue-950 text-'>Check your cart before proceeding</h1>
          {/* Cart */}
          <div className='md:w-1/2 w-full border p-5 bg-blue-950'>
            {cart.map((item, index) => {
              return (
                <div className='flex place-items-center place-content-between h-20 border p-2 bg-slate-800' key={index}>
                  <div className='flex gap-x-2 place-items-center' >
                    <img className='w-12 h-12' src={item.info.image} alt={item.info.name} />
                    <span>{item.info.name}</span>
                    <span className='bg-slate-800 text-green-500 p-3'>${item.quantity * item.info.price}</span>
                  </div>
                  <span className='flex place-items-center'>
                    <span className='border bg-green-500 p-5'>{item.quantity}</span>
                    <span onClick={() => addToCart(item)} className='bg-green-500 p-3 h-10 w-10 cursor-pointer select-none rounded-md border hover:bg-green-400 hover:border-green-400 hover:text-white'><BsCartPlusFill /></span>
                    <div onClick={() => removeFromCart(item.info.id)} className='bg-red-600 p-3 h-10 w-10 cursor-pointer select-none rounded-md border hover:bg-red-400 hover:border-red-400 hover:text-white'><BsCartXFill /></div>
                  </span>
                </div>
              )
            })}
          </div>
          <div className='text-center text-4xl my-10'>TOTAL:  <span className='text-green-500'>${total}</span></div>
          {/* Payment Info */}
          <span className='w-full flex flex-col place-items-center '>
            <h2 className='text-3xl p-4 bg-orange-400 rounded-t-xl'>Your info</h2>
            <form className='flex flex-col md:w-[40%] w-[60%] bg-orange-400 p-4 rounded-xl' onSubmit={handleSubmit}>
              <label>
                Name:
                <br />
                <input className='border border-black rounded-xl w-full text-black mb-5 ' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label>
                Email:
                <br />
                <input className='border border-black rounded-xl w-full text-black mb-5 ' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Address:
                <br />
                <textarea className='border border-black rounded-xl w-full text-black mb-5 ' value={address} onChange={(e) => setAddress(e.target.value)} required />
              </label>
              <label>
                Payment Method:
                <br />
                <select className='border border-black rounded-xl w-full text-black mb-5 p-5 ' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </label>
              <button className='border md:w-[70%] w-1/2 border-orange-400 hover:border-slate-800 p-5 mt-5 bg-slate-800 hover:bg-green-600 text-white text-xl font-bold m-auto' type='submit'>Place order</button>
            </form>
          </span>
        </div>

        :
        <div className='flex flex-col bg-slate-300 border border-black min-h-screen text-center'>
          <span className='text-3xl mt-[10%]'>You removed all items on the cart!!!</span>
          <NavLink className='border md:w-[70%] w-1/2 border-orange-400 hover:border-slate-800 p-5 mt-5 bg-slate-800 hover:bg-orange-600 text-white text-xl font-bold m-auto' to={'/catalog'}>Go back to CATALOG</NavLink>
        </div>
      }

    </div>
  );
}

export default Checkout;
