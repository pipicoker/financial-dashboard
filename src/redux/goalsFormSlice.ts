import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer'; 

export interface FormState {
    activeForm: boolean;
    activeAdjustForm: boolean ;
    targetAmount: string
    presentAmount: string
    // categoryTargetAmounts: Record<string, number>;
    categoryTargetAmounts: string;
  }
  
export const goalsFormSlice  = createSlice({
    name: "form",
    initialState: {
        activeForm: false,
        activeAdjustForm: false,
        targetAmount: '',
        presentAmount: '',
        // categoryTargetAmounts: {} as Record<string, number>, 
        categoryTargetAmounts: '',
      },

    reducers: {
        setActiveForm: (state, action) => {
          state.activeForm = action.payload;
        },
        setActiveAdjustForm: (state, action) => {
          state.activeAdjustForm = action.payload;
        },
        setTargetAmount: (state, action) => {
          state.targetAmount = action.payload;
        },
        setPresentAmount: (state, action) => {
          state.presentAmount = action.payload;
        },
        setCategoryTargetAmount: (state, action) => {
          state.categoryTargetAmounts = action.payload;
        },
        // setCategoryTargetAmount: (state, action: PayloadAction<{ id: string; amount: number }>) => {
        //   const { id, amount } = action.payload;
        //   // Use 'immer' to update the draft state
        //   produce(state, (draftState) => {
        //     draftState.categoryTargetAmounts[id] = amount;
        //   });
        // },
        
      },
})

export const {setActiveForm} = goalsFormSlice.actions
export const {setActiveAdjustForm} = goalsFormSlice.actions
export const {setTargetAmount} = goalsFormSlice.actions
export const {setPresentAmount} = goalsFormSlice.actions
export const {setCategoryTargetAmount} = goalsFormSlice.actions

export const selectActiveForm = (state: { form: FormState }) => state.form.activeForm;
export const selectActiveAdjustForm = (state: { form: FormState }) => state.form.activeAdjustForm;
export const selectTargetAmount = (state: { form: FormState }) => state.form.targetAmount;
export const selectPresentAmount = (state: { form: FormState }) => state.form.presentAmount;
export const selectCategoryTargetAmount = (state: { form: FormState }) => state.form.categoryTargetAmounts;
// export const selectCategoryTargetAmount = (state: { form: FormState }, id: string) =>
//   state.form.categoryTargetAmounts[id] || 0;

export default goalsFormSlice.reducer