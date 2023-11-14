import React from 'react'
import Statistics from '../components/Statistics'
import FullExpensesBreakdown from '../components/FullExpensesBreakdown'

const ExpensesPage = () => {
  return (
    <div className=' pt-4 '>
        <div>
        <h3 className=' text-[22px] text-gray02 text-left'>Expenses Comparison</h3>
        <Statistics />
        </div>
        <FullExpensesBreakdown />
        
    </div>
  )
}

export default ExpensesPage