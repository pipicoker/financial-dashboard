import React, { useState } from 'react'
import { useSelector , useDispatch} from 'react-redux';
import {selectAccountForm, setAccountForm} from '../redux/addAccountSlice'
import {selectCardList, setCardList} from '../redux/balancesSlice'
import { selectGetCardList } from '../redux/getCardListSlice';
import { db, auth } from '../config/firebase'
import { addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'
import {GrClose} from 'react-icons/gr'


const AddAccountForm = ({ activeAccountForm, setActiveAccountForm }: { activeAccountForm: boolean, setActiveAccountForm: (value: boolean) => void }) => {
    const accountForm = useSelector(selectAccountForm)
    const dispatch = useDispatch()

    const getCardList = useSelector(selectGetCardList);


    const [accountType, setAccounType ] = useState("")
    const [accountNumber, setAccountNumber ] = useState("")
    const [accountBalance, setAccounBalance ] = useState("")
    const [cardType, setCardType ] = useState("")

    const [newAcconts, setNewAccouts] = useState([])

    const addAccountToDatabase = async  (e : React.FormEvent) => {
      e.preventDefault()
      setActiveAccountForm(false)

      try{
        const docRef = await addDoc(collection(db, 'accounts'), {
          accountType: accountType,
          accountNumber: accountNumber,
          accountBalance: accountBalance,
          cardType: cardType,
          userId: auth.currentUser ? auth.currentUser.uid : null,           
        });
        // Fetch the updated list of accounts
      const data = await getDocs(collection(db, 'accounts'));
      const updatedAccountList = data.docs.map((doc) => ({ ...doc.data() }));

      // Dispatch the updated list to the Redux store
      dispatch(setCardList(updatedAccountList));
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }

  return (
    <div className={`fixed  left-[40%] top-[5%] bottom-[5%] z-[999]  w-[488px]  bg-[#FFF] pl-16 pr-6 pt-4 border ${activeAccountForm ? 'block' : 'hidden'}`}>

        <div className='flex flex-col'>
            <div className='flex justify-end '
             onClick={() => setActiveAccountForm(false)} >
                <GrClose className='w-8 h-8  '/>
            </div>
            <form action="" className='flex flex-col text-left pr-10'>
                    
                <label htmlFor="" className='text-secondary font-semibold'>Account Type</label>
                <input type="text" id='accout-type' placeholder='Credit Card' className='border border-[#D1D1D1] w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setAccounType(e.target.value)}
                />

                <label htmlFor="" className='mt-4 text-secondary font-semibold'>Account Number</label>
                <input type="text" id='account-number' placeholder='3241 8245 0134 8429' className='border border-[#D1D1D1] w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setAccountNumber(e.target.value)}
                />
                <label htmlFor="" className='mt-4  text-secondary font-semibold'>Account Balance</label>
                <input type="text" id='account-balance' placeholder='Fill in your account balance' className='border border-[#D1D1D1] w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setAccounBalance(e.target.value)}
                />
                <label htmlFor="" className='mt-4 text-secondary font-semibold'>Card Type</label>
                <input type="text" id='card-type' placeholder='AC Bank Ltd' className='border border-[#D1D1D1] w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'
                onChange={(e) => setCardType(e.target.value)}
                />
                
                <div className='flex justify-center'>
                <button className=' mt-8 h-12 w-48 bg-pry-col text-[#FFF] font-bold'
                onClick={addAccountToDatabase}
                >Save</button>
                </div>
                
            </form>

            

        </div>
        
    </div>

   
  )
}

export default AddAccountForm