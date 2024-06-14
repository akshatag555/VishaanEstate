import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listApartment } from "../Actions/Apartment";
import { clearError } from "../Redux/User/userSlice";
const ListApartment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    price: 50,
    available: true,
    parking: false,
    furnished: false,
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formDataToSend = new FormData();

    // Append form fields to FormData
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("bedrooms", formData.bedrooms);
    formDataToSend.append("bathrooms", formData.bathrooms);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("available", formData.available);
    formDataToSend.append("parking", formData.parking);
    formDataToSend.append("furnished", formData.furnished);

    // Append files to FormData
    for (const file of files) {
     // console.log(file);
      formDataToSend.append("photos", file);
    }

    // Dispatch action to list apartment with FormData
    console.log(formDataToSend);
    await dispatch(listApartment(formDataToSend));

    // Reset form fields, files, and loading state

    setFormData({
      imageUrls: [],
      name: "",
      description: "",
      address: "",
      bedrooms: 1,
      bathrooms: 1,
      price: 50,
      available: true,
      parking: false,
      furnished: false,
    });
    setFiles([]);
    setLoading(false)
    // dispatch(listApartment(formData));
  };
  const handleRemoveImage = (indexToRemove) => {
  // Filter out the image URL at the specified index
  const updatedImageUrls = formData.imageUrls.filter((url, index) => index !== indexToRemove);
  const updatedFiles = files.filter((file, index) => index !== indexToRemove);

  // Update the formData state with the filtered imageUrls
  setFormData({
    ...formData,
    imageUrls: updatedImageUrls,
  });

  // Update the files state with the filtered files array
  setFiles(updatedFiles);
  
};

  const handleImageSubmit = (e) => {
    e.preventDefault();
    setUploading(true)
    // Implement image uploading logic here
    const handleImageLoad = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          //console.log(reader.result);
          // Append the new image URL directly to imageUrls array
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: [...prevFormData.imageUrls, reader.result],
          }));
        }
      };
      reader.readAsDataURL(file);
    };

    //console.log(files);
    // Check if files array is not empty
    if (files.length > 0) {
      // Call handleImageLoad with the first file
      // for (const file of files) {
      //   handleImageLoad(file);
      // }
      handleImageLoad(files[files.length-1]);
    }
    setUploading(false)
  };
  // const handleImageSubmit=(e)=>{
  //   e.preventDefault();

  // }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="3"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
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
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={(e) =>
                  setFormData({ ...formData, parking: e.target.checked })
                }
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={(e) =>
                  setFormData({ ...formData, furnished: e.target.checked })
                }
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
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bedrooms: parseInt(e.target.value),
                  })
                }
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bathrooms: parseInt(e.target.value),
                  })
                }
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={(e) =>
                  setFormData({ ...formData, price: parseInt(e.target.value) })
                }
                value={formData.price}
              />
              <div className="flex flex-col items-center">
                <p>Price</p>

                <span className="text-xs">($ / month)</span>
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
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) =>
                setFiles((prevFiles) => [...prevFiles, ...e.target.files])
              }
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)} // Call handleRemoveImage with the index
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default ListApartment;
