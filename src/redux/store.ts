import {  configureStore } from '@reduxjs/toolkit'
import buttonReducer from "./buttonSlice"
import goalsFormSlice from './goalsFormSlice';

const store = configureStore({
    reducer: {
        button: buttonReducer,
        form: goalsFormSlice
    }
})

export default store;