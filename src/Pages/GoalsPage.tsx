import React, {useEffect} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import Goals from '../components/Goals'
import { useSelector, useDispatch } from 'react-redux'
import { setGoalCategory, selectGoalCategory } from '../redux/goalsByCategorySlice'
import GoalsByCategory from '../components/GoalsByCategory'

const GoalsPage = () => {
     const dispatch = useDispatch()

    const goalsRef = collection(db, "expensesGoalsByCategory")

    // function to get expenses goals by category data from firestore
    useEffect(() => {
        const getGoalsCategory = async () => {

            try{
                const data =  await getDocs(goalsRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                dispatch(setGoalCategory(filteredData))
                
            } catch (err) {
                console.error(err);
               
                
                
            } 
            
        }
        getGoalsCategory()
    }, [])
  return (
    <div className='px-6 pt-4 '>
        <div className='flex'>
        <Goals />

        </div>
        <GoalsByCategory />
        
    </div>
  )
}

export default GoalsPage