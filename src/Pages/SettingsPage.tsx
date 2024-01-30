import React from 'react'
import SettingBtns from '../components/SettingBtns'

import { useSelector } from 'react-redux'
import { selectActiveSettingBtn } from '../redux/settingbuttonSlice'
import UserDetails from '../components/UserDetails'
import SecurityDetails from '../components/SecurityDetails'

const SettingsPage = () => {

    const activeSettingBtn = useSelector(selectActiveSettingBtn)
  return (
    <div className='h-full mt-4 mx-6 px-8 pt-6 pb-12 bg-[#FFF]'>
        <SettingBtns />

        <div>
            {activeSettingBtn  === "account"  ? <UserDetails /> : <SecurityDetails />}
        </div>
    </div>
  )
}

export default SettingsPage