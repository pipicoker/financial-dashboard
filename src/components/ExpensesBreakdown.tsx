import React, {useState, useEffect} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import {BsHouseDoor} from "react-icons/bs"
import {BsArrowRight} from "react-icons/bs"
import {BsArrowUp} from "react-icons/bs"
import {BsArrowDown} from "react-icons/bs"

import { useSelector,  } from 'react-redux';
import {  selectExpenseBreakdown } from '../redux/expensesSlices';

const ExpensesBreakdown = () => {
  const breakdown = useSelector(selectExpenseBreakdown)



    


  return (
    <div className='mt-5'>
        <div className='flex justify-between items-center w-[728px] text-gray03'>
            <h3 className='text-left  text-[22px]'>Expenses Breakdown</h3>
            <button className='flex items-center text-xs'>Compare to last week

            </button>
        </div>

        <div className='mt-2 px-6 py-5 bg-[#FFF] w-[728px] h-[212px] grid grid-cols-3  '>
            
           {breakdown.map((item, index) => (
             <div key={index} className=''>
                <div className='flex  items-center gap-6'>
 
                <div className='w-10 h-14 rounded-lg bg-special flex justify-center items-center'>
                  <img src={item.logo} alt="logo" className='w-6 h-6 text-gray02'/>
                    {/* <BsHouseDoor 
                    /> */}
                </div>

                <div className='text-left'>
                    <p className='text-gray02 text-xs font-medium capitalize'>
                      {item.type}
                    </p>
                    <p className='text-defaultBlack font-extrabold'>
                      ${item.total}.00
                    </p>

                    <div className='flex items-center'>
                        
                      <p className='text-xs font-medium text-gray02'>
                        {item.percentage}%
                      </p>

                      <div className=''>
                        {item.color === 'red' ? (
                            <BsArrowUp className='text-[#E73D1C] ' />
                        ) : (
                            <BsArrowDown className='text-[#4DAF6E] '/>
                        )}
                      </div>

                    </div>
                    
                  
                  
                </div>

                <button>
                  <BsArrowRight className='w-[19px] h-[14px]'/>
                </button>
                

                </div>
                
               
             </div>
           ))}
        </div>
    </div>
  )
}

export default ExpensesBreakdown