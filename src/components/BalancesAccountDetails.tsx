import React from 'react'
import { Link } from 'react-router-dom';
import { deleteDoc, doc,  } from 'firebase/firestore';
import { db, auth } from '../config/firebase'
import {  selectAccountDetails } from '../redux/accountDetailsSlice';
import { useSelector } from 'react-redux';
 

const BalancesAccountDetails = () => {
    const accountDetails = useSelector(selectAccountDetails)

    const handleDeleteCard = async (cardId: string | undefined) => {
        if (!cardId) {
          console.error('Invalid cardId:', cardId);
          return;
        }      
        try {

            if(auth.currentUser) {
                // Delete the document from Firestore
                await deleteDoc(doc(db, 'accounts', cardId))
                console.log('Card deleted from Firestore');
            
                } else {
                   console.log('User not Logged in')
                }
          
        } catch (error: any) {
          // Log error details
          console.error('Error deleting card:', error.message, error.code);
        }
      }; 

  return (
    <div className='w-full'>
        <h3 className='text-left text-gray02 text-[22px]' >Account Details</h3>

        <div className=' mt-4 bg-[#FFF] px-8 pt-8 text-left rounded-lg pb-10'>
            {accountDetails && (
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-10 justify-center items-start'>
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
                onClick={() => handleDeleteCard(accountDetails.id)}
                >Remove</button> 
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default BalancesAccountDetails