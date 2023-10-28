import React from 'react'
import { Link } from 'react-router-dom';
import { deleteDoc, doc, collection } from 'firebase/firestore';
import { db, auth } from '../config/firebase'
import { accountDetailsSlice, selectAccountDetails } from '../redux/accountDetailsSlice';
import { useSelector } from 'react-redux';


const BalancesAccountDetails = () => {
    const accountDetails = useSelector(selectAccountDetails)

    const deleteCard = async(cardId: string) => {

        try{
            if(auth.currentUser) {
                await deleteDoc(doc(db, 'accounts', cardId))
                console.log('Card deleted from Firestore');

                // dispatch(removeCard(cardId))
            } else {
                console.log('User not Logged in')
            }
        } catch(error) {
            console.log('Error deleting card', error)
        }

    }

  return (
    <div className=''>
        <h3 className='text-left text-gray02 text-[22px]' onClick={() => console.log(accountDetailsSlice)}>Account Details</h3>

        <div className='w-[1104px] h-[292px] mt-4 bg-[#FFF] px-8 pt-8 text-left'>
            {accountDetails && (
                <div className='grid grid-cols-3 gap-y-10 '>
                <div>
                    <p className='text-gray03'>Bank Name</p>
                        <p className='text-lg font-bold text-secondary'>{accountDetails["cardType"]}</p>
                </div>
                <div>
                    <p className='text-gray03'>Account Type</p>
                    <p className='text-lg font-bold text-secondary'>{accountDetails["accountType"]}</p>
                </div>
                <div>
                    <p className='text-gray03'>Balance</p>
                    <p className='text-lg font-bold text-secondary'>${accountDetails["accountBalance"]}</p>
                </div>
                <div>
                    <p className='text-gray03'>Branch Name</p>
                    <p className='text-lg font-bold text-secondary'>Park Street Branch</p>
                </div>
                <div>
                    <p className='text-gray03'>Account Number</p>
                    <p className='text-lg font-bold text-secondary'>{accountDetails["accountNumber"]}</p>
                </div>
            </div>
            )}
            

            <div className='flex items-center mt-10 space-x-8'>
                
                <button className='bg-pry-col px-4 py-2 font-bold text-[#FFF] rounded-[4px]'>Edit Details</button>

                <Link to="/Home/Balances">
                <button className='text-gray01 font-semibold text-sm'
                onClick={() => deleteCard(accountDetails.cardType)}
                >Remove</button> 
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default BalancesAccountDetails