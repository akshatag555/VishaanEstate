import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, sendOTP } from '../Actions/User';
import { Link, useNavigate } from 'react-router-dom';
import {
  clearError
} from "../Redux/User/userSlice";
import OAuth from '../assets/OAuth';
const SignUp = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const navigate = useNavigate();
  const [password,setPassword]=useState("");
  const dispatch=useDispatch()
  const { loading, error } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await dispatch(registerUser(name, email, password));
    console.log(error)
    if (!error) {
      navigate('/userverification')
      await dispatch(sendOTP(email));
      
    }
  }
  useEffect(()=>{
   // navigate('/userverification')
    dispatch(clearError());
  },[error])
    
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
         // disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
           Sign Up
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/login'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
    </div>
  )
}

export default SignUp
