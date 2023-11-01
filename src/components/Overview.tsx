import React from 'react'
import TotalBalance from './TotalBalance'
import Goals from './Goals'
import UpcomingBill from './UpcomingBill'
import RecentTransactions from './RecentTransactions'
import Statistics from './Statistics'
import ExpensesBreakdown from './ExpensesBreakdown'
import GoalsForm from './GoalsForm'

const Overview = () => {
  return (
    <div className='px-6 pt-4 '>
      <GoalsForm />
      <div className='grid grid-cols-3'>
        <TotalBalance />
        <Goals />
        <UpcomingBill />
      </div>
        <div className='flex space-x-4 mt-8 '>
          <RecentTransactions />
          <div>
            <div>
            <h3 className=' text-[22px] text-gray02 text-left'>Statistics</h3>
            <Statistics />

            </div>
            
            <ExpensesBreakdown />
          </div>
        </div>
    </div>
  )
}

export default Overview