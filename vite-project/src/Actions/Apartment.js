import axios from 'axios';
import { toast } from 'react-toastify';

export const listApartment = (formData) => async (dispatch) => {
 
  try {
  //  console.log(formData)
    const { data } = await axios.post(
      "/api/v1/apartment/list",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      }
    );

    // Dispatch any success action or handle the response data as needed
    //console.log(data);
    toast.success("Listing created successfully")
  } catch (error) {
    // Handle error
    toast.error('Listing cannot be created')
    console.error("Error listing apartment:", error);
  }
};
  export const getAllApartment = () => async (dispatch) => {
    try {
      
      dispatch(apartmentStart())
      const { data } = await axios.post(
        "/api/v1/apartments",
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
    } catch (error) {
     
    }
  };