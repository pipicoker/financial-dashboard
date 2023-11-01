import { createSlice } from '@reduxjs/toolkit'

interface FormState {
    activeForm: boolean;
    targetAmount: string
    presentAmount: string
  }
  
export const goalsFormSlice  = createSlice({
    name: "form",
    initialState: {
        activeForm: false,
        targetAmount: '',
        presentAmount: ''
    },

    reducers: {
        setActiveForm: (state, action) => {
          state.activeForm = action.payload;
        },
        setTargetAmount: (state, action) => {
          state.targetAmount = action.payload;
        },
        setPresentAmount: (state, action) => {
          state.presentAmount = action.payload;
        },
      },
})

export const {setActiveForm} = goalsFormSlice.actions
export const {setTargetAmount} = goalsFormSlice.actions
export const {setPresentAmount} = goalsFormSlice.actions
export const selectActiveForm = (state: { form: FormState }) => state.form.activeForm;
export const selectTargetAmount = (state: { form: FormState }) => state.form.targetAmount;
export const selectPresentAmount = (state: { form: FormState }) => state.form.presentAmount;

export default goalsFormSlice.reducer