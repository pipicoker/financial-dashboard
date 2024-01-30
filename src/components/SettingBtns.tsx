import React from 'react'
import { setActiveSettingBtn, selectActiveSettingBtn } from '../redux/settingbuttonSlice'
import { useSelector, useDispatch } from 'react-redux'
const SettingBtns = () => {
    const activeSettingBtn = useSelector(selectActiveSettingBtn)
    const dispatch = useDispatch()
  return (
    <div className='flex justify-start items-center space-x-8'>
        <button className={`font-bold  text-base ${activeSettingBtn === 'account' ? ' text-pry-col border-b-2 border-pry-col pb-2 pt-2' : "text-secondary" }`} 
        onClick={() => dispatch(setActiveSettingBtn('account'))}>
            Accounts
            </button>
            <button className={`font-bold  text-base ${activeSettingBtn === 'security' ? ' text-pry-col border-b-2 border-pry-col pb-2 pt-2' : "text-secondary" }`} 
        onClick={() => dispatch(setActiveSettingBtn('security'))}>
            Security
            </button>
            

    </div>
  )
}

export default SettingBtns