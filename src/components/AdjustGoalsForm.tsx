import React  from 'react'
import { useForm  } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector, useDispatch } from 'react-redux'
import { setActiveAdjustForm, selectActiveAdjustForm , setCategoryTargetAmount, selectCategoryTargetAmount, selectOpenedCategory, } from '../redux/goalsFormSlice'
import { setGoalCategory } from '../redux/goalsByCategorySlice'

import { db } from '../config/firebase'
import {  collection, getDocs, updateDoc, doc,  } from 'firebase/firestore'
import {GrClose} from 'react-icons/gr'


interface FormInputs {
  targetAmount: string,
  
}

const AdjustGoalsForm = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>({
    criteriaMode: "all"
  });

    const dispatch = useDispatch()
    const categoryTargetAmount = useSelector(selectCategoryTargetAmount)

    const openedCategory = useSelector(selectOpenedCategory)
    
  const activeAdjustForm = useSelector(selectActiveAdjustForm)


const handleSave = async ( ) => {
    dispatch(setActiveAdjustForm(false))

    const docRef = doc(db, 'expensesGoalsByCategory', openedCategory);
  try {
    // Update the "amount" field in the document
    await updateDoc(docRef, {
      amount: categoryTargetAmount,
    });
    
    const goalsRef = collection(db, "expensesGoalsByCategory")
    const data = await getDocs(goalsRef);
        const filteredData = data.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
        }));
        dispatch(setGoalCategory(filteredData));
    // console.log('Document successfully updated in Firestore');
    alert("successfully changed the amount")

    dispatch(setCategoryTargetAmount(''))
  } catch (error) {
    console.error('Error updating document in Firestore:', error);
  }
  };

  return (
    <div className={`fixed lg:top-[40%]  lg:left-[40%] z-[999] w-5/6 lg:w-[488px] lg:h-[392px] bg-[#FFF] ml-3 lg:ml-0 pl-4 pb-8 lg:pb-0 lg:pl-16 pr-6 pt-4 border ${activeAdjustForm ? 'block' : 'hidden'}`}>

        <div className='flex flex-col'>
            <div className='flex justify-end ' >

                <GrClose className='w-8 h-8  ' onClick={() => {
                  dispatch(setCategoryTargetAmount(''))
                  dispatch(setActiveAdjustForm(false))}}/>
            </div>
            <form onSubmit={handleSubmit(handleSave)}
            action="" className='flex flex-col text-left lg:pr-10'>

                <label htmlFor="" className='mt-6 text-secondary font-semibold'>Target Amounts</label>
                {openedCategory && (
                <input 
                          {...register('targetAmount', 
                          {required: "Target Amount required",
                        })}
                        type='number'
                  id='present-amount'
                  placeholder='Write target amounts here'
                  className='border border-[#D1D1D1] w-full lg:w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                  value={categoryTargetAmount}
                  onChange={(e) => {

                    if (e.target.value !== '' && parseFloat(e.target.value) !== 0) {
                      dispatch(setCategoryTargetAmount(e.target.value.toString()));
                    }
                  }}
                />
                )}
                <ErrorMessage
                  errors={errors}
                  name="targetAmount"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type} className='text-red-400 text-left text-sm font-semibold'>{message}</p>
                    ))
                  }
                />
                
                <div className='flex justify-center'>
                <button className=' mt-8 h-12 w-48 bg-pry-col text-[#FFF] font-bold'
              
                >Save</button>
                </div>
                
            </form>

            

        </div>
        
    </div>
  )
}

export default AdjustGoalsForm