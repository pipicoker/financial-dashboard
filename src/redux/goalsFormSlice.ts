import { createSlice } from '@reduxjs/toolkit'

interface FormState {
    activeForm: boolean;
  }
  
export const goalsFormSlice  = createSlice({
    name: " form",
    initialState: {
        activeForm: false
    },

    reducers: {
        setActiveForm: (state, action) => {
            state.activeForm = action.payload
        }
    }
})

export const {setActiveForm} = goalsFormSlice .actions
export const selectActiveForm = (state: { form: FormState }) => state.form.activeForm;

export default goalsFormSlice .reducer