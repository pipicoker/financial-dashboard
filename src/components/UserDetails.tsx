import React from 'react'
import { selectuserDetails } from '../redux/profileDetailsSlice'

import { useSelector } from 'react-redux'
import UploadProfileImage from './UploadProfileImage'



const UserDetails = () => {
  const userDetails = useSelector(selectuserDetails)

  return (
    <div className='mt-8 flex flex-col lg:flex-row justify-between'>
      {userDetails ? 
                <div >
                    <div className='text-left space-y-8'>
                        <div>
                            <h4 className='text-secondary font-semibold'>Full name</h4>
                            <p className='px-6 pt-4 text-gray02'>{userDetails.fullName}</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Email</h4>
                            <p className='px-6 pt-4 text-gray02'>{userDetails.email}</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Username</h4>
                            <p className='px-6 pt-4 text-gray02'>{userDetails.username}</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Phone Number</h4>
                            <p className='px-6 pt-4 text-gray02'>{userDetails.phoneNumber}</p>
                        </div>
                    </div>
                   
                
                <button className='bg-pry-col mt-[52px] flex justify-start text-[#FFF] px-6 py-3 rounded-[4px] font-bold'>Update Profile</button>
                </div>

                
            
        : ("no details")}

        <div className='order-first lg:order-last'>
        <UploadProfileImage />

        </div>
       
        
    </div>
  )
}

export default UserDetails