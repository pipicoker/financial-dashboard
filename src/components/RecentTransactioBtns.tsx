import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectActiveButton, setActiveButton } from '../redux/buttonSlice'



const RecentTransactioBtns= () => {

  const activeButton = useSelector(selectActiveButton);
  const dispatch = useDispatch();
  return (
    <div className='flex justify-start space-x-8'>
        <button className={`font-bold  text-base ${activeButton === 'all' ? ' text-[#299D91]' : "text-secondary" }`} 
        onClick={() => dispatch(setActiveButton('all'))}>
            All
            </button>
            <button className={`font-bold  text-base ${activeButton === 'revenue' ? ' text-[#299D91]' : "text-secondary" }`} 
        onClick={() => dispatch(setActiveButton('revenue'))}>
            Revenue
            </button>
            <button className={`font-bold  text-base ${activeButton === 'expenses' ? ' text-[#299D91]' : "text-secondary" }`} 
        onClick={() => dispatch(setActiveButton('expenses'))}>
            Expenses
            </button>

    </div>
  )
}

export default RecentTransactioBtns