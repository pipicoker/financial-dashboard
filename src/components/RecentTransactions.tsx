import React, { useState } from 'react'
import {GrFormNext} from 'react-icons/gr'
import RecentTransactioBtns from './RecentTransactioBtns'
import Revenue from './Revenue'
import Expenses from './Expenses'
import AllExpensesAndRevenue from './AllExpensesAndRevenue'

import { useSelector } from 'react-redux';
import {selectActiveButton } from '../redux/buttonSlice'

const RecentTransactions = () => {
    const activeButton = useSelector(selectActiveButton);
    
    return (

    <div className=''>
        
        <div className='flex justify-between items-center w-[352px] text-gray02 '>
            <h3 className='text-left  text-[22px]'>Recent Transactions</h3>
            <button className='flex items-center text-xs'>View All
            <GrFormNext className='w-4 h-4'/>

            </button>
        </div>

        <div className='w-[352px]  mt-2 bg-[#FFF] px-6 pt-4'>

            <div>
                <RecentTransactioBtns />

                <div>
                    {activeButton === 'all' && (
                        <AllExpensesAndRevenue />
                    )}
                    {activeButton === 'revenue' && (
                        <Revenue />
                    )}
                    {activeButton === 'expenses' && (
                        <Expenses />
                    )}
                </div>


                
                
                
            </div>
        </div>
    </div>
  )
}

export default RecentTransactions