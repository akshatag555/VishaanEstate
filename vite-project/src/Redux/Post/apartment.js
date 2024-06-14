import { createSlice } from "@reduxjs/toolkit";
const initialState={
    apartments:null,
    error:null,
    loading:false,
    
}
////add is auth and is verified
const apartmentSlice=createSlice({
    name:'apartment',
    initialState,
    reducers:{
        apartmentStart: (state) => {
            state.loading = true;
        },
        apartmentSuccess: (state, action) => {
            state.apartments = action.payload;
            state.loading = false;
            state.error = null;
            
        },
        apartmentFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false
        }
    }})