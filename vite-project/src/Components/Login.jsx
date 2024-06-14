import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError
} from "../Redux/User/userSlice";
import { loginUser } from '../Actions/User';
import OAuth from '../assets/OAuth';

const Login = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const { loading, error } = useSelector((state) => state.user);
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   });
  // };
  // if(!error){
  //   navigate('/');
  // }
  useEffect(()=>{
    if(!error){
      navigate('/')
    }
    dispatch(clearError());
  },[error])
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email,password))
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

<button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
           Sign In
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Login
