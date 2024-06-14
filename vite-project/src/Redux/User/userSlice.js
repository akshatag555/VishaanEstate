import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error:null,
    loading:false,
    isAuth:false,
    isVerified:false
}
////add is auth and is verified
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        registrationStart: (state) => {
            state.loading = true;
        },
        registrationSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.isAuth=false;
        },
        registrationFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        otpSendStart: (state) => {
            state.loading = true;
        },
        otpSendSuccess: (state, action) => {
            // Handle OTP sending success if needed
            state.loading = false;
        },
        otpSendFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        otpVerifyStart: (state) => {
            state.loading = true;
        },
        otpVerifySuccess: (state, action) => {
            // Handle OTP verification success if needed
            state.loading = false;
            state.isVerified=true;
            state.isAuth=true;
        },
        otpVerifyFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isVerified=false;
        },
        loginStart:(state)=>{
            state.loading=true;
        },
        loginSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.isAuth=true;
            state.isVerified=true;
        },
        loginFail:(state,action)=>{
            state.error=action.payload
            state.loading=false;
            state.isAuth=false;
            state.isVerified=false;
        },
        logoutStart: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
            state.isAuth=false;
            
        },
        logoutFail: (state,action) => {
            state.error=action.payload
            state.loading = false;
            state.isAuth=true;
            state.isVerified=true;
        },
        updateProfileStart: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateProfileFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updatePasswordStart: (state) => {
            state.loading = true;
        },
        updatePasswordSuccess: (state) => {
            // Handle password update success if needed
            state.loading = false;
        },
        updatePasswordFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError:(state)=>{
            state.error=null;
        },
        
    }
});
export const {loginStart,
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
    logoutStart,
    logoutFail,
    logoutSuccess,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordStart,
    updatePasswordSuccess,
    updatePasswordFail,
    clearError}=userSlice.actions;
export default userSlice.reducer