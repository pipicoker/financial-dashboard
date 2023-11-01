import {PiGameController} from 'react-icons/pi'

import { useSelector,  } from 'react-redux';
import {  selectRevenues} from '../redux/revenueAndExpensesSlice'
const Revenue = () => {

    const revenues = useSelector(selectRevenues)
 

  return (
    <div className='divide-y mt-3'>{revenues.map((data) => (
        <div key={data.name} className='flex justify-between items-center  py-6'>
  
              <div className='flex items-center  space-x-3 text-left'>
                  <div className='w-10 h-10 flex justify-center items-center bg-special rounded-lg'>
                      <PiGameController className='w-6 h-6'/>
                  </div>
  
                  <div>
                      <p className='text-defaultBlack font-semibold'>{data.name}</p>
                      <p className='text-gray03 text-xs'>{data.item}</p>
                  </div>
              </div>
  
              <div>
                  <p className='font-semibold text-secondary'>${data.amount}</p>
                  <p className='text-xs text-gray03'>17 May 2023</p>
              </div>
              
          </div>
      ))}</div>
  )
}

export default Revenue