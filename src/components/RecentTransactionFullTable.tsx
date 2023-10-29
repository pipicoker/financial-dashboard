import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveButton } from '../redux/buttonSlice';
import { setExpenses, selectExpenses, selectRevenues, setRevenues} from '../redux/revenueAndExpensesSlice'
import {PiGameController} from 'react-icons/pi'

const RecentTransactionFullTable = () => {
  const activeButton = useSelector(selectActiveButton)
  const expenses = useSelector(selectExpenses)
  const revenue = useSelector(selectRevenues)
  const revenuesAndExpenses = expenses.concat(revenue)

  const [tableDetails, setTableDetails] = useState(revenuesAndExpenses)

  const cecki = () => {
    console.log(activeButton)
  }

  useEffect(() => {
    if (activeButton === 'all') {
      setTableDetails(revenuesAndExpenses);
    } else if (activeButton === 'revenue') {
      setTableDetails(revenue);
    } else if (activeButton === 'expenses') {
      setTableDetails(expenses);
    }
  }, [activeButton]);
  

  return (
    <div className='w-[1104px] mt-6 px-7 pb-14 rounded-2xl bg-[#FFF]'>
        <table className='w-full divide-y'>
          <thead>
            <tr>
                  <th className='pt-6 pb-4 text-left'>Items</th>
                  <th className='pt-6 pb-4'>Shop Name</th>
                  <th className='pt-6 pb-4'>Date</th>
                  <th className='pt-6 pb-4'>Payment Method</th>
                  <th className='pt-6 pb-4'>Amount</th>
              </tr>
          </thead>
            

            <tbody className='divide-y'>
              {tableDetails.map((details, id) => (
                  <tr key={id} >
                    <td className='pt-4 pb-4 flex items-center font-semibold gap-4 capitalize text-defaultBlack'><PiGameController/>{details.item}</td>
                    <td className='pt-4 pb-4 text-gray01 font-medium'>{details.name}</td>
                    <td className='pt-4 pb-4 text-gray01 font-medium'>27 July, 2020</td>
                    <td className='pt-4 pb-4 text-gray01 font-medium'>Credit card</td>
                    <td className='pt-4 pb-4  text-defaultBlack font-semibold'>${details.amount}</td>
                  </tr>
                  
                ))}
            </tbody>
             
            
        </table>

        <button className='mt-8 px-6 py-3 bg-pry-col text-[#FFF] font-bold'>Load More</button>
    </div>
  )
}

export default RecentTransactionFullTable