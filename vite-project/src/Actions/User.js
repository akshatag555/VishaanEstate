import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFail,
  registrationStart,
  registrationSuccess,
  registrationFail,
  otpSendStart,
  otpSendSuccess,
  otpSendFail,
  otpVerifyStart,
  otpVerifySuccess,
  otpVerifyFail,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFail,
} from "../Redux/User/userSlice"
import { toast } from "react-toastify";

export const registerUser = (name,email,password) => async (dispatch) => {
  
  try {
    console.log(password);
    dispatch(registrationStart());
    const { data } = await axios.post(
      "/api/v1/register",
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(registrationSuccess(data.user));
    toast.success("User Created")
  } catch (error) {
    toast.error(error.response.data.message)
    dispatch(registrationFail(error.response.data.message));
  }
};
export const sendOTP = (email) => async (dispatch) => {
  try {
    dispatch(otpSendStart());
    const { data } = await axios.post(
      "/api/v1/otpsend",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(otpSendSuccess(data.message));
    toast.success(`Otp Sent successfully to${email}`)
  } catch (error) {
    dispatch(otpSendFail(error.response.data.message));
    toast.error(error.response.data.message)
  }
};
export const verifyOTP = (email, otp) => async (dispatch) => {
  try {
    dispatch(otpVerifyStart());
    const { data } = await axios.post(
      "/api/v1/verify",
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(otpVerifySuccess(data.message));
    toast.success(`User verified`)
  } catch (error) {
    dispatch(otpVerifyFail(error.response.data.message));
    toast.error(error.response.data.message)
  }
};
export const googleauth=(name,email)=>async(dispatch)=>{
  try {
    dispatch(loginStart());
    console.log("asdkasdda")
    const { data } = await axios.post(
      "/api/v1/googleauth",
      { name,email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    dispatch(loginSuccess(data.user));
    toast("Welcome to VishaanEstate!!!");
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
    toast.error(error.response.data.message);
  }
}
export const loginUser = (email, password) => async (dispatch) => {
  
  try {
    console.log(password);
    dispatch(loginStart());
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(loginSuccess(data.user));
   toast("Welcome to Vishaan Estate")
  } catch (error) {
    toast.error(error.response.data.message)
    dispatch(loginFail(error.response.data.message));
  }
};
export const updateProfile = (name, email) => async (dispatch) => {
  console.log(name)
  try {
    dispatch(updateProfileStart());
    const { data } = await axios.put(
      `/api/v1/profile/update`,
      { name, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(updateProfileSuccess(data.user));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};
export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch(updatePasswordStart());
      const { data } = await axios.put(
        `/api/v1/profile/update/password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(updatePasswordSuccess(data));
    } catch (error) {
      dispatch(updatePasswordFail(error.response.data.message));
    }
  };
  export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(logoutStart());

       
        await axios.put("/api/v1/logout");

        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data.message));
    }
};