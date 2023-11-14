import React from 'react'
import { Link } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import RecentTransactioBtns from './RecentTransactioBtns'
import AllExpensesAndRevenue from './AllExpensesAndRevenue'

const RecentTransactions = () => {
    
    return (

    <div className='md:w-1/3'>
        
        <div className='flex justify-between items-center w-full text-gray02 '>
            <h3 className='text-left  text-[22px]'>Recent Transactions</h3>
            <Link to="/Home/Transactions">
            <button className='flex items-center text-xs'>View All
            <GrFormNext className='w-4 h-4'/>

            </button>
            </Link>
        </div>

        <div className='w-full mt-2 bg-[#FFF] px-6 pt-4 pb-[34px] rounded-lg'>

            <div>
                <RecentTransactioBtns />
                <AllExpensesAndRevenue />

              


                
                
                
            </div>
        </div>
    </div>
  )
}

export default RecentTransactions