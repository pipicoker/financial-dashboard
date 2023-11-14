import { createSlice } from '@reduxjs/toolkit'

interface NavState {
    nav: boolean;

  }
  
export const navSlice  = createSlice({
    name: "NavControl",
    initialState: {
        nav: false
    },

    reducers: {
        setNav: (state, action) => {
          state.nav = action.payload;
        }
        
      },
})

export const {setNav} = navSlice.actions

export const selectNAv = (state: { NavControl: NavState }) => state.NavControl.nav;


export default navSlice.reducer