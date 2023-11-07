import React from 'react'

const SecurityDetails = () => {
  return (
    <div className='mt-8'>
        <div className='text-left space-y-8'>
                        <div>
                            <h4 className='text-secondary font-semibold'>Old Password</h4>
                            <p className='px-6 pt-4 text-gray02'>********</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>New Password</h4>
                            <p className='px-6 pt-4 text-gray02'>********</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Retype Password</h4>
                            <p className='px-6 pt-4 text-gray02'>*******</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Phone Number</h4>
                            <p className='px-6 pt-4 text-gray02'>0809040487</p>
                        </div>
                    </div>
        <button className='bg-pry-col mt-[52px] flex justify-start text-[#FFF] px-6 py-3 rounded-[4px] font-bold'>Update Password</button></div>
  )
}

export default SecurityDetails