import { createSlice } from '@reduxjs/toolkit'

interface FormState {
    accountForm: boolean;

  }
  
export const addAccountSlice  = createSlice({
    name: "addAccountForm",
    initialState: {
        accountForm: false
    },

    reducers: {
        setAccountForm: (state, action) => {
          state.accountForm = action.payload;
        }
        
      },
})

export const {setAccountForm} = addAccountSlice.actions

export const selectAccountForm = (state: { form: FormState }) => state.form.accountForm;


export default addAccountSlice.reducer