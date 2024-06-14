import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { isAuth, isVerified } = useSelector((state) => state.user);

  return (
    <div>
      <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-slate-500'>Vishaan</span>
              <span className='text-slate-700'>Estate</span>
            </h1>
          </Link>
          
          <ul className='flex gap-4'>
            {isAuth && isVerified && (
              <Link to='/listapartment'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  List Apartment
                </li>
              </Link>
            )}
            
            {isAuth && isVerified && (
              <Link to='/profile'>
                <li className=' text-slate-700 hover:underline'> Profile</li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
