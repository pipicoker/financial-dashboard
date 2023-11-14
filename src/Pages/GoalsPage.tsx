import React, {useEffect} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import Goals from '../components/Goals'
import { useDispatch } from 'react-redux'
import { setGoalCategory } from '../redux/goalsByCategorySlice'
import GoalsByCategory from '../components/GoalsByCategory'
import SavingSummary from '../components/SavingSummary'
import GoalsForm from '../components/GoalsForm'
import AdjustGoalsForm from '../components/AdjustGoalsForm'

const GoalsPage = () => {
     const dispatch = useDispatch()

    const goalsRef = collection(db, "expensesGoalsByCategory")

    // function to get expenses goals by category data from firestore
    useEffect(() => {
       // Inside the function to get goals data from Firestore
    const getGoalsCategory = async () => {
        try {
        const data = await getDocs(goalsRef);
        const filteredData = data.docs.map((doc) => ({
            id: doc.id, // Store the document ID
            ...doc.data(),
        }));
        dispatch(setGoalCategory(filteredData));
        } catch (err) {
        console.error(err);
        }
    };
    
            getGoalsCategory();
        }, [goalsRef, dispatch]);
  return (
    <div className=' pt-4 w-full'>
        <GoalsForm />
            <AdjustGoalsForm />
        <div className='lg:flex gap-4 w-full'>
            
            <Goals />
            <SavingSummary />

        </div>
        <GoalsByCategory />
        
    </div>
  )
}

export default GoalsPage