import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../Actions/User';
import {
  clearError
} from "../Redux/User/userSlice";
const OtpSend = () => {
  const [password,setPassword]=useState("");
  const navigate = useNavigate();
  const  email=useSelector((state) => state.user.currentUser.email)
  const { loading, error } = useSelector((state) => state.user);
  const dispatch=useDispatch()
  console.log(email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(verifyOTP(email, password));
    if (!error) {
      navigate('/'); // Redirect to dashboard or any other desired page
    }
  };
  useEffect(()=>{
    dispatch(clearError())
  },[])
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input
          type='password'
          placeholder='Enter a 6-digit OTP'
          className='border p-3 rounded-lg'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

<button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          Verify
        </button>
        
      </form>
     
      <div className='flex gap-2 mt-5'>
       
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
        
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default OtpSend
