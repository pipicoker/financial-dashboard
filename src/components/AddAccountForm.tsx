import React, { useState } from 'react'
import { useForm  } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, } from 'react-redux';
import {setCardList, } from '../redux/balancesSlice'
import { db } from '../config/firebase'
import { addDoc, collection, getDocs,  } from 'firebase/firestore'
import {GrClose} from 'react-icons/gr'

interface FormInputs {
  accountType: string,
  accountNumber: string,
  accountBalance: string,
  cardType: string
}

const AddAccountForm = ({ activeAccountForm, setActiveAccountForm }: { activeAccountForm: boolean, setActiveAccountForm: (value: boolean) => void }) => {
  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>({
    criteriaMode: "all"
  });

    const dispatch = useDispatch()

    const [accountType, setAccounType ] = useState("")
    const [accountNumber, setAccountNumber ] = useState("")
    const [accountBalance, setAccounBalance ] = useState("")
    const [cardType, setCardType ] = useState("")

    // const [newAcconts, setNewAccouts] = useState([])

    const addAccountToDatabase = async  () => {
      // e.preventDefault()
      setActiveAccountForm(false)

      try{
          await addDoc(collection(db, 'accounts'), {
          accountType: accountType,
          accountNumber: accountNumber,
          accountBalance: accountBalance,
          cardType: cardType,
          // userId: auth.currentUser ? auth.currentUser.uid : null,           
        });
        // Fetch the updated list of accounts
      const data = await getDocs(collection(db, 'accounts'));
      const updatedAccountList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))

      // Dispatch the updated list to the Redux store
      dispatch(setCardList(updatedAccountList));
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }

  return (
    <div className={`fixed pb-8   lg:left-[40%] top-2  lg:bottom-[5%] z-[999] w-5/6 lg:w-[488px] bg-[#FFF] ml-3 lg:ml-0 pl-4 lg:pl-16 pr-6 pt-4  border ${activeAccountForm ? 'block' : 'hidden'}`}>

        <div className='flex flex-col'>
            <div className='flex justify-end '
             onClick={() => setActiveAccountForm(false)} >
                <GrClose className='w-8 h-8  '/>
            </div>
            <form onSubmit={handleSubmit(addAccountToDatabase)}
            action="" className='flex flex-col text-left px-4 lg:px-0 lg:pr-10'>
                    
                <label htmlFor="" className='text-secondary font-semibold'>Account Type</label>
                <input 
                {...register('accountType', 
                {required: "Account Type is required",
              })}
                type="text" id='accout-type' placeholder='Credit Card' className='border border-[#D1D1D1] w-full lg:w-[360px] h-12 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setAccounType(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="accountType"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type} className='text-red-400 text-left text-sm font-semibold'>{message}</p>
                    ))
                  }
                />

                <label htmlFor="" className='mt-4 text-secondary font-semibold'>Account Number</label>
                <input 
                {...register('accountNumber', 
                {required: "Account Number is required",
              })}
                type="number" id='account-number' placeholder='3241 8245 0134 8429' className='border border-[#D1D1D1] w-full lg:w-[360px] h-12 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setAccountNumber(e.target.value.toString())}
                />
                <ErrorMessage
                  errors={errors}
                  name="accountNumber"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type} className='text-red-400 text-left text-sm font-semibold'>{message}</p>
                    ))
                  }
                />


                <label htmlFor="" className='mt-4  text-secondary font-semibold'>Account Balance</label>
                <input 
                {...register('accountBalance', 
                {required: "Account Balance is required",
              })}
                type="number" id='account-balance' placeholder='Fill in your account balance' className='border border-[#D1D1D1] w-full lg:w-[360px] h-12 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setAccounBalance(e.target.value.toString())}
                />
                <ErrorMessage
                  errors={errors}
                  name="accountBalance"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type} className='text-red-400 text-left text-sm font-semibold'>{message}</p>
                    ))
                  }
                />

                <label htmlFor="" className='mt-4 text-secondary font-semibold'>Card Type</label>
                <input 
                {...register('cardType', 
                {required: "Card Type is required",
              })}
                type="text" id='card-type' placeholder='AC Bank Ltd' className='border border-[#D1D1D1] w-full lg:w-[360px] h-12 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setCardType(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="cardType"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type} className='text-red-400 text-left text-sm font-semibold'>{message}</p>
                    ))
                  }
                />
                
                <div className='flex justify-center'>
                <button className=' mt-6 h-12 w-48 bg-pry-col text-[#FFF] font-bold'
                // onClick={addAccountToDatabase}
                >Save</button>
                </div>
                
            </form>
        </div>
        
    </div>

   
  )
}

export default AddAccountForm