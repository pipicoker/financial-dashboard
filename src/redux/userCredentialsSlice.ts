import { createSlice } from '@reduxjs/toolkit'

interface userState {
        user: object 
  }
  
export const userCredentialsSlice  = createSlice({
    name: " userCredentials",
    initialState: {
        user: {}
        
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const {setUser} = userCredentialsSlice.actions
export const selectUser = (state: { userCredentials: userState }) => state.userCredentials.user;

export default userCredentialsSlice.reducer