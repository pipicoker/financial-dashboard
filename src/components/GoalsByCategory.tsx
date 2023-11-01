import React from 'react'
import { useSelector } from 'react-redux'
import { selectGoalCategory } from '../redux/goalsByCategorySlice'
import {FiEdit3} from 'react-icons/fi'


const GoalsByCategory = () => {
    const goalsCategory = useSelector(selectGoalCategory)

  return (
    <div className='mt-8'>
        <h3 className='text-left text-gray02 text-[22px]' onClick={() => console.log(goalsCategory)
        }>Expenses Goals by Category</h3>

        <div className='grid grid-cols-3 gap-4 mt-4'>
          {goalsCategory && goalsCategory.map((data, id) => (
            <div key={id} className='flex items-center justify-between bg-[#FFF] rounded-lg px-6 py-7 capitalize'>

              <div className='flex space-x-4'>
                <div className='w-10 h-12 flex bg-special justify-center items-center rounded-lg'>
                  <img src={data.logo} alt="logo" className='w-6 h-6' />
                </div>

                <div className='text-left'>
                  <p className='text-gray03 font-medium'>{data.type}</p>
                  <p className='text-lg font-extrabold text-defaultBlack'>${data.amount}.00</p>
                </div>
              </div>
              

              <button className='flex items-center px-4 py-2 rounded-[4px] border border-pry-col text-pry-col'>Adjust <FiEdit3 className='ml-2'/></button>
            </div>
          ))}
        </div>
    </div>
  )
}

export default GoalsByCategory