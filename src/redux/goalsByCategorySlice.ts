import { createSlice } from '@reduxjs/toolkit';

interface GoalCategoryState {
  goalCategory: {
    id: ''
    type: string;
    amount: number;
    logo: string;
  }[];
}

export const goalsByCategorySlice = createSlice({
  name: "ByCategory",
  initialState: {
    goalCategory: []
  },

  reducers: {
    setGoalCategory: (state, action) => {
      state.goalCategory = action.payload;
    }
  },
});

export const { setGoalCategory } = goalsByCategorySlice.actions;

export const selectGoalCategory = (state: { ByCategory: GoalCategoryState }) => state.ByCategory.goalCategory;


export default goalsByCategorySlice.reducer;
