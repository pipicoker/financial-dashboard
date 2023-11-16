import { createSlice } from '@reduxjs/toolkit'

interface userState {
        pix: string 
  }
  
export const userProfilePixSlice  = createSlice({
    name: " profilePix",
    initialState: {
        pix: "" 
        
    },

    reducers: {
        setPix: (state, action) => {
            state.pix = action.payload
        },
    }
})

export const {setPix} = userProfilePixSlice.actions
export const selectPix = (state: { profilePix: userState }) => state.profilePix.pix;

export default userProfilePixSlice.reducer