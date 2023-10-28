import {  configureStore } from '@reduxjs/toolkit'
import buttonReducer from "./buttonSlice"
import goalsFormSlice from './goalsFormSlice';
import targetAmountSlice from './targetAmountSlice';
import balancesSlice from './balancesSlice';
import addAccountSlice from './addAccountSlice';
import getCardListSlice from './getCardListSlice';
import accountDetailsSlice from './accountDetailsSlice';
import revenueAndExpensesSlice from './revenueAndExpensesSlice';
const store = configureStore({
    reducer: {
        button: buttonReducer,
        form: goalsFormSlice,
        target: targetAmountSlice,
        balances: balancesSlice,
        addAccountForm: addAccountSlice,
        getCardList: getCardListSlice,
        accountDetail: accountDetailsSlice,
        transactions: revenueAndExpensesSlice,
    }
})

export default store;