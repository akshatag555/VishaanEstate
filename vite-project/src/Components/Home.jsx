import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListingItem from '../assets/ListItems';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { ToastContainer, toast } from 'react-toastify';
import {
  clearError
} from "../Redux/User/userSlice";
import 'swiper/css/bundle';
const Home = () => {
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
   
    const fetchRentListings = async () => {
      try {
        const response = await axios.get('/api/v1/apartments');
         setRentListings(response.data.listings); // Update rentListings with fetched data
      } catch (error) {
        console.error('Error fetching rent listings:', error);
      }
    };

    fetchRentListings(); // Invoke the fetchRentListings function when the component mounts
   
  }, []); // Empty dependency array ensures that useEffect runs only once after the initial render

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Vishaan Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
  {rentListings &&
    rentListings.length > 0 &&
    rentListings.map((listing) => (
      // Check if imageUrls array exists and has at least one image URL
      listing.imageUrls && listing.imageUrls.length > 0 && (
        <SwiperSlide key={listing._id}>
          <div
            style={{
              background: `url(${listing.imageUrls[0].url}) center no-repeat`,
              backgroundSize: 'cover',
            }}
            className='h-[500px]'
          ></div>
        </SwiperSlide>
      )
    ))}
</Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {/* {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )} */}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Home;
