import React from 'react'
import { useSelector } from 'react-redux';
import {  selectExpenseBreakdown } from '../redux/expensesSlices';

import {BsArrowDown} from "react-icons/bs"
import {BsArrowUp} from "react-icons/bs"

const FullExpensesBreakdown = () => {
    const breakdown = useSelector(selectExpenseBreakdown)
  return (
    <div className='mt-8 w-full'>
       <h3 className=' text-[22px] text-gray02 text-left' >Expenses Breakdown</h3>

       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {breakdown.map((data, id) => (
            <div key={id}>
                <div className=''>
                    <div className='flex justify-between items-center bg-gray05 px-6 py-4 rounded-t-lg'>
                        
                        <div className='flex items-center space-x-4'>
                            <div className='w-10 h-[46px] flex justify-center items-center rounded-lg bg-gray04'>
                                <img src={data.logo}
                                onClick={() => {
                                    console.log(breakdown);
                                    
                                    console.log(data.breakdown)}}
                                 alt="logo" className='w-6 h-6 text-secondary'/>
                            </div>
                            
                            <div className='text-left'>
                                <p className='text-gray01 font-medium capitalize'>{data.type}</p>
                                <p className='text-lg font-extrabold text-defaultBlack'>${data.total}.00</p>
                            </div>

                        </div>
                        

                        <div >
                            <div className='flex items-center justify-end'>
                            
                            <p className=' font-semibold text-gray01'>
                            {data.percentage}%
                            </p>
    
                            <div className=''>
                            {data.color === 'red' ? (
                                <BsArrowUp className='text-[#E73D1C] ' />
                            ) : (
                                <BsArrowDown className='text-[#4DAF6E] '/>
                            )}
                            </div>
    
                            </div>
                      
                            <p className='text-gray01 text-xs font-light'>Compare to last month</p>
                        </div>
                        
                    </div>

                    <div className='divide-y '>
                        {data.breakdown && data.breakdown.map((item, id) => (
                            <div key={id} className='bg-[#FFF] px-6 py-4 flex justify-between capitalize rounded-b-lg'>
                                
                               <p className='font-semibold text-secondary'>{item.name}</p>
                                

                                <div>
                                    <p className='font-semibold text-secondary'>${item.amount}.00</p>
                                    <p className='text-gray03 text-xs'>17 May 2023</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

          ))}
       </div>


    </div>
  )
}

export default FullExpensesBreakdown