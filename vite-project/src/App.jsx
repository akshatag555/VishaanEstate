import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import ListApartment from './Components/ListApartment';
import UserVerification from './Components/UserVerification';
import {  useSelector } from 'react-redux';
import UpdateListing from './Components/UpdateListing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Apartment from './Components/Apartment';
import Search from './Components/Search';
export default function App() {
  const {isAuth}=useSelector((state)=> state.user)
  return (
    <Router>
   <Header/>
   <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
      <Routes>
        <Route path="/" element={isAuth?<Home/>:<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={isAuth?<Profile/>:<Login/>}/>
        <Route path="/listapartment" element={isAuth?<ListApartment/>:<Login/>}/>
        <Route path="/update-listing/:listingId" element={isAuth?<UpdateListing/>:<Login/>}/>
        <Route path="/userverification" element={<UserVerification/>}/>
        <Route path="/listing/:listingId" element={isAuth?<Apartment/>:<Login/>}/>
        <Route path="/search" element={isAuth?<Search/>:<Login/>}/>
        

      </Routes>
    </Router>
  )
}
