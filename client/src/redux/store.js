import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './authSlice.js'
import rootReducer from "./rootReducer.js";
import { authApi } from "./api/authApi.js";
import { courseApi } from "./api/courseApi.js";
import { purchaseApi } from "./api/coursePurchaseApi.js";
import { courseProgressApi } from "./api/courseProgressApi.js";

export const store = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
});
const initializeApp = async () => {
    await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();