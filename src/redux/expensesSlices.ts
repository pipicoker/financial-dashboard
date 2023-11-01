import { createSlice } from '@reduxjs/toolkit'

interface expenseState {
  expenseBreakdown: {
      total: number;
      percentage: number;
      color: string;
      type: string;
      logo: string;
      breakdown : [{
        amount: 0
        date: ""
        name: ""
      }]
    }[]; 
  }
  
export const expensesSlice  = createSlice({
    name: " expensesBreakdown",
    initialState: {
        expenseBreakdown: [{
            percentage: 0,
      total: 0,
      color: "",
      type: "",
      logo: "",
      breakdown :[{
        amount: 0,
        name: "",
        date: ""
      }]
        }]
    },

    reducers: {
        setExpenseBreakdown: (state, action) => {
            state.expenseBreakdown = action.payload
        },
    }
})

export const {setExpenseBreakdown} = expensesSlice.actions
export const selectExpenseBreakdown = (state: { expensesBreakdown: expenseState }) => state.expensesBreakdown.expenseBreakdown;

export default expensesSlice.reducer