import { createSlice } from '@reduxjs/toolkit'

interface ButtonState {
    activeButton: string;
    activeSettingBtn: string
  }
  
export const buttonSlice  = createSlice({
    name: " button",
    initialState: {
        activeButton: 'all',
        activeSettingBtn: 'account'
    },

    reducers: {
        setActiveButton: (state, action) => {
            state.activeButton = action.payload
        },
        setActiveSettingBtn: (state, action) => {
            state.activeSettingBtn = action.payload
        },
    }
})

export const {setActiveButton, setActiveSettingBtn} = buttonSlice.actions
export const selectActiveButton = (state: { button: ButtonState }) => state.button.activeButton;
export const selectActiveSettingBtn = (state: { button: ButtonState }) => state.button.activeSettingBtn;

export default buttonSlice.reducer