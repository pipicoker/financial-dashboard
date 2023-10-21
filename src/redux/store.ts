import {  configureStore } from '@reduxjs/toolkit'
import buttonReducer from "./buttonSlice"
import goalsFormSlice from './goalsFormSlice';
import targetAmountSlice from './targetAmountSlice';
import balancesSlice from './balancesSlice';

const store = configureStore({
    reducer: {
        button: buttonReducer,
        form: goalsFormSlice,
        target: targetAmountSlice,
        balances: balancesSlice
    }
})

export default store;