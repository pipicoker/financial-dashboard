import React from 'react'
import TotalBalance from './TotalBalance'
import Goals from './Goals'
import UpcomingBill from './UpcomingBill'
import RecentTransactions from './RecentTransactions'
import Statistics from './Statistics'
// import ExpensesBreakdown from './ExpensesBreakdown'
import GoalsForm from './GoalsForm'

const ExpensesBreakdown = React.lazy(() => import('./ExpensesBreakdown'))

const Overview = () => {
  return (
    <div className='px-2  pt-4  w-full'>
      <GoalsForm />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <TotalBalance />
        <Goals />
        <UpcomingBill />
      </div>
        <div className='mt-8 md:flex md:space-x-4 w-full'>
          <RecentTransactions />
          <div className='md:w-2/3'>
            <div className=''>
              <h3 className='mt-6 md:mt-0 text-[22px] text-gray02 text-left'>Statistics</h3>
              <Statistics />
            </div>
            <React.Suspense fallback={<div>Loading...</div>}>
            <ExpensesBreakdown />
          </React.Suspense>
          </div>
        </div>
    </div>
  )
}

export default Overview