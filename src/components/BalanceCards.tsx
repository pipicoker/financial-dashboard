import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import {selectCardList, removeCard} from '../redux/balancesSlice'
import {selectAccountForm, setAccountForm} from '../redux/addAccountSlice'
import { setAccountDetails, selectAccountDetails } from '../redux/accountDetailsSlice';

import { MdOutlineNavigateNext } from 'react-icons/md';
import { deleteDoc, doc, collection } from 'firebase/firestore';
import { db, auth } from '../config/firebase'
import AddAccountForm from './AddAccountForm';
import { log } from 'console';



const BalanceCards = ({ activeAccountForm, setActiveAccountForm }: { activeAccountForm: boolean, setActiveAccountForm: (value: boolean) => void }) => {
    const accountForm = useSelector(selectAccountForm)
    const cardList = useSelector(selectCardList)
    const accountDetails:any = useSelector(setAccountForm)
    const dispatch = useDispatch()


    const handleButtonClick = (e: React.MouseEvent,card: object) => {
        // e.preventDefault()
        
        dispatch(setAccountDetails(card)); // Dispatch the setAccountDetails action
        // console.log(accountDetails);
        console.log(card)
      };
    const deleteCard = async(cardId: string) => {

        try{
            if(auth.currentUser) {
                await deleteDoc(doc(db, 'accounts', cardId))
                console.log('Card deleted from Firestore');

                dispatch(removeCard(cardId))
            } else {
                console.log('User not Logged in')
            }
        } catch(error) {
            console.log('Error deleting card', error)
        }

    }


  return (
    <div>
        <h3 className='text-left text-gray02 text-[22px]' onClick={() => console.log(accountDetails)}>Balances</h3>


        <div className='grid grid-cols-3 gap-6 mt-4'>
            {cardList.map((card: any, id:number) => (
                <div key={id} className='w-[352px] h-72 p-6 bg-[#FFF] divide-y'>

                    <div className='flex justify-between items-center pb-4 '>
                        <p className='font-bold text-gray02'> {card.accountType}</p>
                        <p className='font-medium text-xs text-gray01'>{card.cardType}</p>
                    </div>

                    <div className='pt-4 text-left'>
                    <div>
                        <p className='font-semibold text-xl text-defaultBlack'>{card.accountNumber.toString().replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$4 $4 $4 **** ")}</p>
                        <p className='text-sm text-gray03'>Account Number</p>
                    </div>

                    <div className='mt-4'>
                        <p className='font-semibold text-xl text-defaultBlack'>${card.accountBalance}</p>
                        <p className='text-sm text-gray03'>Toatal amount</p>
                    </div>

                    <div className='mt-[30px] flex justify-between items-center'>
                        <p className='text-pry-col cursor-pointer'
                        onClick={() => deleteCard(card.cardType)}>Remove</p>

                        <Link to="/Home/Balances/AccountDetails">
                            <button className='flex items-center gap-2 justify-center bg-pry-col text-white text-sm font-medium rounded-[4px] px-5 py-2'
                           onClick={(e) => handleButtonClick(e, card)}
                            >Details <span ><MdOutlineNavigateNext className='text-white'/></span> </button>
                        </Link>
                        
                    </div>
                    </div>
                      
                </div>
            ))}
            <div className='w-[352px] h-72 bg-[#FFF] flex flex-col justify-center items-center gap-4'>

                <button className='bg-pry-col px-8 py-3 font-bold  text-[#FFF] rounded-[4px]' onClick={() => setActiveAccountForm(!activeAccountForm)}>Add Accounts</button>

                <button className='text-gray03 font-medium'>Edit Accounts</button>
            </div>
        </div>
        
    </div>
  )
}

export default BalanceCards