import { createSlice } from '@reduxjs/toolkit'

interface userState {
    userDetails: {
    fullName: string;
    email: string;
    phoneNumber: string;
    username: string;
    pix: string
    }; 
  }
  
export const profileDetailsSlice  = createSlice({
    name: " userProfile",
    initialState: {
        userDetails: {}
        
    },

    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
        },
    }
})

export const {setUserDetails} = profileDetailsSlice.actions
export const selectuserDetails = (state: { userProfile: userState }) => state.userProfile.userDetails;

export default profileDetailsSlice.reducer