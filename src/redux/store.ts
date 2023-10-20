import {  configureStore } from '@reduxjs/toolkit'
import buttonReducer from "./buttonSlice"
import goalsFormSlice from './goalsFormSlice';
import targetAmountSlice from './targetAmountSlice';

const store = configureStore({
    reducer: {
        button: buttonReducer,
        form: goalsFormSlice,
        target: targetAmountSlice
    }
})

export default store;