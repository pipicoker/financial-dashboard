import React from 'react'
import { useSelector } from 'react-redux';

import RecentTransactioBtns from '../components/RecentTransactioBtns'
import RecentTransactionFullTable from '../components/RecentTransactionFullTable'
import {selectActiveButton } from '../redux/buttonSlice'
import FullExpensesAndRevenue from '../components/FullExpensesAndRevenue'
import FullRevenue from '../components/FullRevenue'
import FullExpenses from '../components/FullExpenses'


const RecentTransactionPage = () => {
  const activeButton = useSelector(selectActiveButton);

  return (
    <div className='px-6 pt-4 '>
         <h3 className='text-left text-gray02 text-[22px] mb-4'>Recent Transaction</h3>
         <RecentTransactioBtns />
         <RecentTransactionFullTable />
         {/* <div>
         {activeButton === 'all' && (
                        <FullExpensesAndRevenue />
                    )}
                    {activeButton === 'revenue' && (
                        <FullRevenue />
                    )}
                    {activeButton === 'expenses' && (
                        <FullExpenses />
                    )}
         </div> */}
    </div>
  )
}

export default RecentTransactionPage