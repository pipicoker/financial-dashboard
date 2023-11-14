import { createSlice } from '@reduxjs/toolkit'

interface Transaction {
  amount: string;
  date: string;
  receipt: string;
  status: string;
  transType: string;
}

interface FormState {
    
    accountDetails: {
      id:string
      accountType: string;
  accountBalance: number;
  accountNumber: number;
  cardType: string;
  transactionHistory: Transaction[];

    }
  }
  
export const accountDetailsSlice  = createSlice({
    name: "accountDetail",
    initialState: {
       id: "",
        accountDetails: {
          accountType : "",
          accountBalance: 0,
          accountNumber: 0,
          cardType: "",
          transactionHistory :[{
            amount: "",
            date: "",
            receipt: "",
            status: "",
            transType: ""
          }]
        }
    },

    reducers: {
        
        setAccountDetails: (state, action) => {
          state.accountDetails = action.payload;
        },
      },
})

export const {setAccountDetails} = accountDetailsSlice.actions

export const selectAccountDetails= (state: { accountDetail: FormState }) => state.accountDetail.accountDetails;


export default accountDetailsSlice.reducer