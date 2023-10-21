import { createSlice } from '@reduxjs/toolkit'

interface CardState {
    cardList: any;
  }
  
export const balancesSlice  = createSlice({
    name: " balances",
    initialState: {
        cardList: []
    },

    reducers: {
        setCardList: (state, action) => {
            state.cardList = action.payload
        }
    }
})

export const {setCardList} = balancesSlice .actions
export const selectCardList = (state: { balances: CardState }) => state.balances.cardList;

export default balancesSlice .reducer