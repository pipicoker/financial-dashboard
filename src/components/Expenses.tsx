import React, { useEffect, useRef, useState } from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';

import {PiGameController} from 'react-icons/pi'

const Expenses = () => {

  const [expenses, setExpenses] = useState<{ [x: string]: any }[]>([]);

    const expensesRef = collection(db, "expenses")

    // function to get data from firestore
    useEffect(() => {
      const getExpenses = async () => {

          try{
              const data =  await getDocs(expensesRef)
              const filteredData = data.docs.map((doc) => ({
                  ...doc.data()
              }))
              setExpenses(filteredData)
              
              
          } catch (err) {
              console.error(err);
              
          }
          
      }
      getExpenses()
  }, [])

  return (
    <div className='divide-y mt-3'>{expenses.map((data) => (
      <div key={data.item} className='flex justify-between items-center  py-6'>

            <div className='flex items-center  space-x-3 text-left'>
                <div className='w-10 h-10 flex justify-center items-center bg-special rounded-lg'>
                    <PiGameController className='w-6 h-6'/>
                </div>

                <div>
                    <p className='text-defaultBlack font-semibold'>{data.item}</p>
                    <p className='text-gray03 text-xs'>{data.store}</p>
                </div>
            </div>

            <div>
                <p className='font-semibold text-secondary'>${data.price}</p>
                <p className='text-xs text-gray03'>17 May 2023</p>
            </div>
            
        </div>
    ))}</div>
  )
}

export default Expenses