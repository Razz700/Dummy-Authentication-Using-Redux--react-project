import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice=createSlice({
    name:'userSlice',
    initialState:{
        isLoggedIn:false,
        user:null
    },
    reducers:{
        isLoggedInCase:(state,action)=>{
            state.isLoggedIn=true;
             state.user=action.payload;    
        },
        isLoggedOutCase:(state)=>{
            state.isLoggedIn=false;
            state.user=null
        }
    }
});

export const {isLoggedInCase,isLoggedOutCase}=userAuthSlice.actions;
export default userAuthSlice.reducer;