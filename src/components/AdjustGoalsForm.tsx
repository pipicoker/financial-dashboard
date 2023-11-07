import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveAdjustForm, selectActiveAdjustForm , setCategoryTargetAmount, selectCategoryTargetAmount} from '../redux/goalsFormSlice'
import { RootState } from '../redux/types'

import { db, auth } from '../config/firebase'
import { addDoc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'
import {GrClose} from 'react-icons/gr'

interface GoalsCategory {
    id: string;
    // ... other properties
  }
const AdjustGoalsForm = () => {
    const dispatch = useDispatch()
    const categoryTargetAmount = useSelector(selectCategoryTargetAmount)
    
  const activeAdjustForm = useSelector(selectActiveAdjustForm)
//   const selectedItemId = useSelector(selectActiveAdjustForm); 
//   const id = selectedItemId.toString();

//   const categoryTargetAmount = useSelector((state: RootState) =>
//   selectCategoryTargetAmount(state, id)
// );

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault()
//     dispatch(setActiveAdjustForm(false))

//     try {
      
//       // Adding a new document to the collection based on user input
//       const docRef = await addDoc(collection(db, 'savingSummary'), {
//         amount: categoryTargetAmount,
//         userId: auth.currentUser ? auth.currentUser.uid : null,           
//       });
     
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };
  

  return (
    <div className={`fixed top-[40%] left-[40%] z-[999]  w-[488px] h-[392px] bg-[#FFF] pl-16 pr-6 pt-4 border ${activeAdjustForm ? 'block' : 'hidden'}`}>

        <div className='flex flex-col'>
            <div className='flex justify-end ' >

                <GrClose className='w-8 h-8  ' onClick={() => dispatch(setActiveAdjustForm(false))}/>
            </div>
            <form action="" className='flex flex-col text-left pr-10'>

                <label htmlFor="" className='mt-6 text-secondary font-semibold'>Target Amounts</label>
                <input  id='present-amount' placeholder='Write present amounts here' className='border border-[#D1D1D1] w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                value={categoryTargetAmount}
                // onChange={(e) => 
                //     {
                //     const amountInput = e.target.value;
                //     const id = selectedItemId.toString(); // Convert the boolean to a string
                //     const amount = parseFloat(amountInput); // Parse the input value to a number (float)
                //     dispatch(setCategoryTargetAmount({ id, amount }
                //         ));
                       
                //   }}

                onChange={(e) => dispatch(setCategoryTargetAmount(e.target.value))}

                />
                
                <div className='flex justify-center'>
                <button className=' mt-8 h-12 w-48 bg-pry-col text-[#FFF] font-bold'
                // onClick={handleSave}
                >Save</button>
                </div>
                
            </form>

            

        </div>
        
    </div>
  )
}

export default AdjustGoalsForm