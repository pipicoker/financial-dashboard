import React, { useEffect, useState , } from 'react'
import { useSelector } from 'react-redux';
import { selectActiveButton } from '../redux/buttonSlice';
import {  selectExpenses, selectRevenues, } from '../redux/revenueAndExpensesSlice'
import {PiGameController} from 'react-icons/pi'

const AllExpensesAndRevenue = () => {
  const activeButton = useSelector(selectActiveButton)
  const expenses = useSelector(selectExpenses)
  const revenue = useSelector(selectRevenues)
  const revenuesAndExpenses = expenses.concat(revenue)

  const [tableDetails, setTableDetails] = useState(revenuesAndExpenses);
  // const prevTableDetails = useRef(revenuesAndExpenses);
  useEffect(() => {
  
      if (activeButton === 'expenses') {
        setTableDetails(expenses);
    } else if (activeButton === 'revenue') {
      setTableDetails(revenue);
    } else  {
      setTableDetails(revenuesAndExpenses);
    }
  }, [activeButton, expenses, revenue, ])

  return (
    <div className='divide-y mt-3'>
      {tableDetails.map((data, id) => (
        <div key={id} className='flex justify-between items-center py-6'>
          <div className='flex items-center space-x-3 text-left'>
            <div className='w-10 h-10 flex justify-center items-center bg-special rounded-lg'>
              <PiGameController className='w-6 h-6' />
            </div>
            <div>
              <p className='text-defaultBlack font-semibold'>{data.item}</p>
              <p className='text-gray03 text-xs'>{data.name}</p>
            </div>
          </div>
          <div>
            <p className='font-semibold text-secondary'>${data.amount}</p>
            <p className='text-xs text-gray03'>17 May 2023</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllExpensesAndRevenue;
