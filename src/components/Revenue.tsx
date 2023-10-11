import React, { useEffect, useRef, useState } from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';

import {PiGameController} from 'react-icons/pi'

const Revenue = () => {

    const [revenues, setRevenues] = useState<{ [x: string]: any }[]>([]);

    const revenuesRef = collection(db, "revenue")

    // function to get data from firestore
    useEffect(() => {
        const getRevenues = async () => {

            try{
                const data =  await getDocs(revenuesRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                setRevenues(filteredData)
                
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getRevenues()
    }, [])

  return (
    <div className='divide-y mt-3'>{revenues.map((data) => (
        <div key={data.Name} className='flex justify-between items-center  py-6'>
  
              <div className='flex items-center  space-x-3 text-left'>
                  <div className='w-10 h-10 flex justify-center items-center bg-special rounded-lg'>
                      <PiGameController className='w-6 h-6'/>
                  </div>
  
                  <div>
                      <p className='text-defaultBlack font-semibold'>{data.Name}</p>
                      <p className='text-gray03 text-xs'>{data.item}</p>
                  </div>
              </div>
  
              <div>
                  <p className='font-semibold text-secondary'>${data.amount}</p>
                  <p className='text-xs text-gray03'>17 May 2023</p>
              </div>
              
          </div>
      ))}</div>
  )
}

export default Revenue