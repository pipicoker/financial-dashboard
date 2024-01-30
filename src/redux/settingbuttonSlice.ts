import { createSlice } from '@reduxjs/toolkit'

interface ButtonState {
    activeSettingBtn: string
  }
  
export const settingButtonSlice  = createSlice({
    name: " settingBtn",
    initialState: {
        activeSettingBtn: 'account'
    },

    reducers: {
        
        setActiveSettingBtn: (state, action) => {
            state.activeSettingBtn = action.payload
        },
    }
})

export const { setActiveSettingBtn} = settingButtonSlice.actions
export const selectActiveSettingBtn = (state: { button: ButtonState }) => state.button.activeSettingBtn;

export default settingButtonSlice.reducer