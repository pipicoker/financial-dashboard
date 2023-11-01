import { createSlice } from '@reduxjs/toolkit'

interface Transaction {
    billDate: string
    company: string
    duration: string
    lastCharge: string
    pix: string
    description: string
    price: number

 
  }

interface FormState {
    upcoming: Transaction[]

  }
  
export const upcomingBillSlice  = createSlice({
    name: "upcomingBill",
    initialState: {
        upcoming: [
            {
              billDate: "",
                company: "",
                duration: "",
                lastCharge: "",
                pix: "",
                description: "",
                price: 0,

            }
        ],

    },

    reducers: {
      setUpcoming: (state, action) => {
        state.upcoming = action.payload;
      },
    
  },
  
})

export const {setUpcoming} = upcomingBillSlice.actions


export const selectUpcoming = (state: { upcomingBill: FormState }) => state.upcomingBill.upcoming;



export default upcomingBillSlice.reducer