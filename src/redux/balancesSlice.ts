import { createSlice } from '@reduxjs/toolkit'

interface CardState {
    cardList: {
      id: string
      accountBalance: number;
      accountNumber: number;
      accountType: string;
      cardType: string;
    }[];
  }
  
export const balancesSlice  = createSlice({
    name: " balances",
    initialState: {
        cardList: [{
          id: "",
            accountBalance: 0,
      accountNumber: 0,
      accountType: "",
      cardType: "",
      transactionHistory :[{
        amount: "",
        date: "",
        receipt: "",
        status: "",
        transType: ""
      }]
        }]
    },

    reducers: {
        setCardList: (state, action) => {
            state.cardList = action.payload
        },

        removeCard: (state, action) => {
            state.cardList = state.cardList.filter(card => card.cardType !== action.payload) 
        }
    }
})

export const {setCardList} = balancesSlice.actions
export const {removeCard} = balancesSlice.actions
export const selectCardList = (state: { balances: CardState }) => state.balances.cardList;

export default balancesSlice.reducer