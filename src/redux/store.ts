import {  configureStore } from '@reduxjs/toolkit'
import buttonReducer from "./buttonSlice"

const store = configureStore({
    reducer: {
        button: buttonReducer
    }
})

export default store;