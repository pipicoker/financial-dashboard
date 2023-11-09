import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
    activeForm: boolean;
    activeAdjustForm: boolean ;
    targetAmount: string
    presentAmount: string
    categoryTargetAmounts: string;
    openedCategory:  string 
    categoryValues: object
  }
  
export const goalsFormSlice  = createSlice({
    name: "form",
    initialState: {
        activeForm: false,
        activeAdjustForm: false,
        targetAmount: '',
        presentAmount: '',
        categoryTargetAmounts: "",
        openedCategory:  "",
        categoryValues: {} as Record<string, any>,
      },

    reducers: {
        setActiveForm: (state, action) => {
          state.activeForm = action.payload;
        },
         setActiveAdjustForm :(state, { payload }) => {
          state.activeAdjustForm = payload.value;
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
        setOpenedCategory: (state, action) => {
          state.openedCategory = action.payload;
        },
        setCategoryValue: (state, action: PayloadAction<{ category: string; value: any }>) => {
          const { category, value } = action.payload;
          state.categoryValues[category] = value;
        },
        
      },
})

export const {setActiveForm} = goalsFormSlice.actions
export const {setActiveAdjustForm} = goalsFormSlice.actions
export const {setTargetAmount} = goalsFormSlice.actions
export const {setPresentAmount} = goalsFormSlice.actions
export const {setCategoryTargetAmount} = goalsFormSlice.actions
export const {setOpenedCategory, setCategoryValue} = goalsFormSlice.actions

export const selectActiveForm = (state: { form: FormState }) => state.form.activeForm;
export const selectActiveAdjustForm = (state: { form: FormState }) => state.form.activeAdjustForm;
export const selectTargetAmount = (state: { form: FormState }) => state.form.targetAmount;
export const selectPresentAmount = (state: { form: FormState }) => state.form.presentAmount;
export const selectOpenedCategory = (state: { form: FormState }) => state.form.openedCategory;
export const selectCategoryTargetAmount = (state: { form: FormState }) => state.form.categoryTargetAmounts;
export const selectCategoryValues= (state: { form: FormState }) => state.form.categoryTargetAmounts;


export default goalsFormSlice.reducer