import { createSlice } from '@reduxjs/toolkit'

interface FormState {
    targetAmount: string
  }
  
export const targetAmountSlice  = createSlice({
    name: "target",
    initialState: {
        targetAmount: '',
    },

    reducers: {
       
        setTargetAmount: (state, action) => {
          state.targetAmount = action.payload;
        },
        
      },
})

export const {setTargetAmount} = targetAmountSlice.actions
export const selectTargetAmount = (state: { form: FormState }) => state.form.targetAmount;

export default targetAmountSlice.reducer