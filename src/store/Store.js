import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../stateSlices/userAuthSlice";

export default configureStore({
    reducer:{
          userAuth:userAuthReducer
    }
})