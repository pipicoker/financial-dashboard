import { createSlice } from '@reduxjs/toolkit'

interface Transaction {
  name : string,
    amount: number;
    item: string
 
  }

interface FormState {
    revenues: Transaction[]
    expenses: Transaction[]
    expensesAndRevenue: Transaction[]
  }
  
export const revenueAndExpensesSlice  = createSlice({
    name: "transactions",
    initialState: {
        revenues: [
            {
              name: "",
                amount: 0,
                item: ""
            }
        ],
        expenses: [
            {
              name: "",
                amount: 0,
                item: ""
            }
        ],
        expensesAndRevenue: [
          {
            name: "",
              amount: 0,
              item: ""
          }
      ],
    },

    reducers: {
      setRevenues: (state, action) => {
        state.revenues = action.payload;
      },
      setExpenses: (state, action) => {
        state.expenses = action.payload;
      },
      setExpRev: (state, action) => {
        state.expensesAndRevenue = action.payload;
      },
  },
  
})

export const {setRevenues} = revenueAndExpensesSlice .actions
export const {setExpenses} = revenueAndExpensesSlice .actions
export const {setExpRev} = revenueAndExpensesSlice .actions

export const selectRevenues = (state: { transactions: FormState }) => state.transactions.revenues;
export const selectExpenses = (state: { transactions: FormState }) => state.transactions.expenses;
export const selectexpensesAndRevenue = (state: { transactions: FormState }) => state.transactions.expensesAndRevenue;


export default revenueAndExpensesSlice .reducer