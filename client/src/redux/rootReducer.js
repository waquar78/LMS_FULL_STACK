import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authSlice.js';
import { authApi } from "./api/authApi";
import { courseApi } from "./api/courseApi.js";
import { purchaseApi } from "./api/coursePurchaseApi.js";
import { courseProgressApi } from "./api/courseProgressApi.js";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer

});
export default rootReducer;