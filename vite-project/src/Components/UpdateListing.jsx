import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  clearError
} from "../Redux/User/userSlice";
const updateApartment = () => {
  const { currentUser } = useSelector((state) => state.user);
  // const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const [uploading,setUploading]=useState(false)
  const [imageUploadError,setimageUploadError]=useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    price: 50,
    
    available:true,
    parking: false,
    furnished: false,
  });
  const params=useParams()
  useEffect(()=>{
    const apartmentdetails=async()=>{
      setLoading(true)
      const response=await axios.get(`/api/v1/apartment/${params.listingId}`)
      setLoading(false)
     setFormData(response.data)
     
     
    // Implement image uploading logic here
    
      // const reader = new FileReader();
      // reader.onload = () => {
      //   if (reader.readyState === 2) {
      //     setImage(reader.result);
      //     //console.log(reader.result);
      //     // Append the new image URL directly to imageUrls array
      //     setFormData((prevFormData) => ({
      //       ...prevFormData,
      //       imageUrls: [...prevFormData.imageUrls, reader.result],
      //     }));
      //   }
      // };
      // reader.readAsDataURL(file);
    

    //console.log(files);
    // Check if files array is not empty
    // if (imageUrls.length > 0) {
    //   // Call handleImageLoad with the first file
    //    for (const file of imageUrls) {
    //      handleImageLoad(file);
    //    }
      
    // }
    }
    apartmentdetails();
  },[])
  const handleSubmit=(e)=>{
    e.preventDefault();
    const updateApartment=async()=>{
      setLoading(true)
      const respone=await axios.put(`/api/v1/apartment/${params.listingId}`, formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
      setLoading(false)
      setFormData(respone.data)
    }
    updateApartment()
  }
  const handleImageSubmit=()=>{

  }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>
      Update Listing
    </h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
      <div className='flex flex-col gap-4 flex-1'>
        <input
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg'
          id='name'
          maxLength='62'
          minLength='3'
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
        <textarea
          type='text'
          placeholder='Description'
          className='border p-3 rounded-lg'
          id='description'
          required
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          value={formData.description}
        />
        <input
          type='text'
          placeholder='Address'
          className='border p-3 rounded-lg'
          id='address'
          required
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          value={formData.address}
        />
        <div className='flex gap-6 flex-wrap'>
          {/* <div className='flex gap-2'>
            <input
              type='checkbox'
              id='sale'
              className='w-5'
              onChange={(e) => setFormData({ ...formData, type: e.target.checked ? 'sale' : 'rent' })}
              checked={formData.type === 'sale'}
            />
            <span>Sell</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='rent'
              className='w-5'
              onChange={(e) => setFormData({ ...formData, type: e.target.checked ? 'rent' : 'sale' })}
              checked={formData.type === 'rent'}
            />
            <span>Rent</span>
          </div> */}
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='parking'
              className='w-5'
              onChange={(e) => setFormData({ ...formData, parking: e.target.checked })}
              checked={formData.parking}
            />
            <span>Parking spot</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='furnished'
              className='w-5'
              onChange={(e) => setFormData({ ...formData, furnished: e.target.checked })}
              checked={formData.furnished}
            />
            <span>Furnished</span>
          </div>
          {/* <div className='flex gap-2'>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              onChange={(e) => setFormData({ ...formData, offer: e.target.checked })}
              checked={formData.offer}
            />
            <span>Offer</span>
          </div> */}
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='bedrooms'
              min='1'
              max='10'
              required
              className='p-3 border border-gray-300 rounded-lg'
              onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
              value={formData.bedrooms}
            />
            <p>Beds</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='bathrooms'
              min='1'
              max='10'
              required
              className='p-3 border border-gray-300 rounded-lg'
              onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
              value={formData.bathrooms}
            />
            <p>Baths</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='regularPrice'
              min='50'
              max='10000000'
              required
              className='p-3 border border-gray-300 rounded-lg'
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              value={formData.price}
            />
            <div className='flex flex-col items-center'>
              <p>Price</p>
              {formData.type === 'rent' && (
                <span className='text-xs'>($ / month)</span>
              )}
            </div>
          </div>
          {/* {formData.offer && (
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='0'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={(e) => setFormData({ ...formData, discountPrice: parseInt(e.target.value) })}
                value={formData.discountPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
  
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
      { <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((image, index) => (
              <div
                key={image.url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={image.url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update listing'}
          </button>
        {/* {error && <p className='text-red-700 text-sm'>{error}</p>} */}
       </div> }
      
    </form>
  </main>
  
  )
}

export default updateApartment
