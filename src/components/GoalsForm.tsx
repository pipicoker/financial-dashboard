import React, { useEffect } from 'react'
import { useForm  } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector, useDispatch } from 'react-redux';
import {selectActiveForm, selectTargetAmount, selectPresentAmount, setActiveForm , setPresentAmount, setTargetAmount} from '../redux/goalsFormSlice'


import { db, auth } from '../config/firebase'
import { addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'
import {GrClose} from 'react-icons/gr'


interface FormInputs {
  targetAmount: string,
  presentAmount: string,

}

const GoalsForm = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>({
    criteriaMode: "all"
  });

    const activeForm = useSelector(selectActiveForm)
    const targetAmount = useSelector(selectTargetAmount)
    const presentAmount = useSelector(selectPresentAmount)
    const dispatch = useDispatch();
  
    const storedTargetAmount = localStorage.getItem('targetAmount');
    const storedPresentAmount = localStorage.getItem('presentAmount');

    useEffect(() => {
      // const storedTargetAmount = localStorage.getItem('targetAmount');
      // const storedPresentAmount = localStorage.getItem('presentAmount');
  
      if (storedTargetAmount) {
        setTargetAmount(storedTargetAmount);
      }
      if (storedPresentAmount) {
        setPresentAmount(storedPresentAmount);
      }
    }, [storedPresentAmount, storedTargetAmount]);

    const handleSave = async () => {
        dispatch(setActiveForm(false))

        try {
          // function to delete all documents before adding a new one
          const deleteCollection = async (collectionRef: any) => {
            const querySnapshot = await getDocs(collectionRef);
            querySnapshot.forEach((doc) => {
              deleteDoc(doc.ref);
            });
          };
          
          // Delete all documents in the collection before adding a new one
          await deleteCollection(collection(db, 'userSpecificGoals'));
          
          // Adding a new document to the collection based on user input
          const docRef = await addDoc(collection(db, 'userSpecificGoals'), {
            targetAmount: targetAmount,
            presentAmount: presentAmount,
            userId: auth.currentUser ? auth.currentUser.uid : null,           
          });

          localStorage.setItem('targetAmount', targetAmount);
      localStorage.setItem('presentAmount', presentAmount);
      console.log(docRef)
         
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      };
      
  return (
    <div className={`fixed lg:top-[40%] lg:left-[40%] z-[999] w-5/6  lg:w-[488px] h-[392px] bg-[#FFF] ml-3 lg:ml-0 pl-4 lg:pl-16 pr-6 pt-4 border rounded-lg ${activeForm ? 'block' : 'hidden'}`}>

        <div className='flex flex-col'>
            <div className='flex justify-end ' onClick={() => dispatch(setActiveForm(false))}>
                <GrClose className='w-8 h-8  '/>
            </div>
            <form onSubmit={handleSubmit(handleSave)}
            action="" className='flex flex-col text-left px-4 lg:px-0 lg:pr-10'>
                    
                <label htmlFor="" className='text-secondary font-semibold'>Target Amounts</label>
                <input 
                {...register('targetAmount', 
                {required: "Target Amount is required",
              })}
                type="number" id='target-amount' placeholder='$500000' className='border border-[#D1D1D1] w-full  lg:w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                value={targetAmount}
                onChange={(e) => dispatch(setTargetAmount(e.target.value.toString()))}
                />
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

                <label htmlFor="" className='mt-6 text-secondary font-semibold'>Present Amounts</label>
                <input 
                {...register('presentAmount', 
                {required: "Present Amount is required",
              })}
                type="number" id='present-amount' placeholder='Write present amounts here' className='border border-[#D1D1D1] lg:w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                value={presentAmount}
                onChange={(e) => dispatch(setPresentAmount(e.target.value.toString()))}
                />
                <ErrorMessage
                  errors={errors}
                  name="presentAmount"
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

export default GoalsForm