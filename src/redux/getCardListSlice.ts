// getCardListSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetCardListState {
  getCardList: (() => Promise<void>) | null;
}

const initialState: GetCardListState = {
  getCardList: null,
};

const getCardListSlice = createSlice({
  name: 'getCardList',
  initialState,
  reducers: {
    setGetCardList: (state, action: PayloadAction<() => Promise<void>>) => {
      state.getCardList = action.payload;
    },
  },
});

export const { setGetCardList } = getCardListSlice.actions;

export const selectGetCardList = (state: { getCardList: GetCardListState }) => state.getCardList.getCardList;

export default getCardListSlice.reducer;
