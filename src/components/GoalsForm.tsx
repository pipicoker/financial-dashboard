import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {selectActiveForm, setActiveForm } from '../redux/goalsFormSlice'

import {GrClose} from 'react-icons/gr'

const GoalsForm = () => {
    const activeForm = useSelector(selectActiveForm)
    const dispatch = useDispatch();

  return (
    <div className={`fixed top-[40%] left-[40%] z-[999]  w-[488px] h-[392px] bg-[#FFF] pl-16 pr-6 pt-4 border ${activeForm ? 'block' : 'hidden'}`}>

        <div className='flex flex-col'>
            <div className='flex justify-end ' onClick={() => dispatch(setActiveForm(false))}>
                <GrClose className='w-8 h-8  '/>
            </div>
            <form action="" className='flex flex-col text-left pr-10'>
                    
                <label htmlFor="" className='text-secondary font-semibold'>Target Amounts</label>
                <input type="text" placeholder='$500000' className='border border-[#D1D1D1] w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'/>

                <label htmlFor="" className='mt-6 text-secondary font-semibold'>Present Amounts</label>
                <input type="text" placeholder='Write present amounts here' className='border border-[#D1D1D1] w-[360px] h-14 mt-2 px-6 py-4 rounded-lg text-gray02'/>
                
                <div className='flex justify-center'>
                <button className=' mt-8 h-12 w-48 bg-pry-col text-[#FFF] font-bold'>Save</button>
                </div>
                
            </form>
        </div>
        
    </div>
  )
}

export default GoalsForm