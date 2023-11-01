import { createSlice } from '@reduxjs/toolkit'

interface ButtonState {
    activeButton: string;
  }
  
export const buttonSlice  = createSlice({
    name: " button",
    initialState: {
        activeButton: 'all'
    },

    reducers: {
        setActiveButton: (state, action) => {
            state.activeButton = action.payload
        }
    }
})

export const {setActiveButton} = buttonSlice.actions
export const selectActiveButton = (state: { button: ButtonState }) => state.button.activeButton;

export default buttonSlice.reducer