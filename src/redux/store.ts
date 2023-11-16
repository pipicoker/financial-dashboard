import {  configureStore } from '@reduxjs/toolkit'
import goalsSlice from './goalsSlice';
import buttonReducer from "./buttonSlice"
import goalsFormSlice from './goalsFormSlice';
import targetAmountSlice from './targetAmountSlice';
import balancesSlice from './balancesSlice';
import addAccountSlice from './addAccountSlice';
import getCardListSlice from './getCardListSlice';
import accountDetailsSlice from './accountDetailsSlice';
import revenueAndExpensesSlice from './revenueAndExpensesSlice';
import upcomingBillSlice from './upcomingBillSlice';
import expensesSlices from './expensesSlices';
import goalsByCategorySlice from './goalsByCategorySlice';
import navSlice from './navSlice';
import profileDetailsSlice from './profileDetails'
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
        upcomingBill: upcomingBillSlice,
        expensesBreakdown: expensesSlices,
        ByCategory: goalsByCategorySlice,
        goalss: goalsSlice,
        NavControl: navSlice,
        userProfile: profileDetailsSlice,
    }
})
export default store;