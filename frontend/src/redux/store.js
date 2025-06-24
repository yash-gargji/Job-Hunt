import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import jobSlice from "./jobSlice.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        job: jobSlice
    }
})

export default store