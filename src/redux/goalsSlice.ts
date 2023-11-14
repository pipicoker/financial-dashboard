import { createSlice } from '@reduxjs/toolkit'

// interface goals {
//     billDate: string
//     company: string
//     duration: string
//     lastCharge: string
//     pix: string
//     description: string
//     price: number

 
//   }

interface goalsState {
    goals : [
        {
            target: number
        targetAchieved: number
        }
    ]

  }
  
export const goalsSlice  = createSlice({
    name: "goalss",
    initialState: {
        goals: [
            {
                target: 0,
            targetAchieved: 0 
            }
        ]   
    },

    reducers: {
      setGoals: (state, action) => {
        state.goals = action.payload;
      },
    
  },
  
})

export const {setGoals} = goalsSlice.actions


export const selectGoals = (state: { goalss: goalsState }) => state.goalss.goals;



export default goalsSlice.reducer