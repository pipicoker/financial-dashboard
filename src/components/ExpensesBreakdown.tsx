import React, {useState, useEffect, ReactNode} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { log } from 'console';
import {BsHouseDoor} from "react-icons/bs"
import {BsArrowRight} from "react-icons/bs"
import {BsArrowUp} from "react-icons/bs"
import {BsArrowDown} from "react-icons/bs"

const ExpensesBreakdown = () => {

    const [breakdown, setBreakdown] = useState<{ [x: string]: any }[]>([]);

    const goalsRef = collection(db, "expensesBreakdown")

    // function to get data from firestore
    useEffect(() => {
        const getBreakdown = async () => {

            try{
                const data =  await getDocs(goalsRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                setBreakdown(filteredData)
                console.log(filteredData);
                
                
                
            } catch (err) {
                console.error(err);
               
                
                
            } 
            
        }
        getBreakdown()
    }, [])


  return (
    <div className='mt-8'>
        <div className='flex justify-between items-center w-[728px] text-gray03'>
            <h3 className='text-left  text-[22px]'>Expenses Breakdown</h3>
            <button className='flex items-center text-xs'>Compare to last week

            </button>
        </div>

        <div className='mt-2 px-6 py-5 bg-[#FFF] w-[728px] h-[212px] grid grid-cols-3 divide-y divide-x'>
            
           {breakdown.map((item, index) => (
             <div key={index} className='flex '>
                <div className='flex  items-center gap-6'>

                <div className='w-10 h-14 rounded-lg bg-special flex justify-center items-center'>
                    <BsHouseDoor className='w-6 h-6 text-gray02'
                    />
                </div>

                <div className='text-left'>
                    <p className='text-gray02 text-xs font-medium capitalize'>
                      {item[Object.keys(item)[0]].type}
                    </p>
                    <p className='text-defaultBlack font-extrabold'>
                      ${item[Object.keys(item)[0]].total}.00
                    </p>

                    <div className='flex items-center'>
                        
                      <p className='text-xs font-medium text-gray02'>
                        {item[Object.keys(item)[0]].percentage}%
                      </p>

                      <div className=''>
                        {item[Object.keys(item)[0]].color === 'red' ? (
                            <BsArrowUp className='text-[#E73D1C] '/>
                        ) : (
                            <BsArrowDown className='text-[#4DAF6E] '/>
                        )}
                      </div>

                    </div>
                    
                  
                  
                </div>

                <BsArrowRight className='w-[19px] h-[14px]'/>

                </div>
                
               
             </div>
           ))}
        </div>
    </div>
  )
}

export default ExpensesBreakdown