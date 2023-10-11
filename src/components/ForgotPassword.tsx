import React from 'react'
import {Link} from 'react-router-dom'


const ForgotPassword = () => {
  return (
    <div className='flex justify-center items-center bg-[#F4F5F7] pt-[64px] pb-[268px]'>
      <div className='w-[400px] h-[596px]'>
        <div className='flex justify-center text-pry-col text-ll'>
          <p className=' tracking-widest font-extrabold '>FINE</p>
          <p className='font-medium  text-pry-col text-ll'>bank.</p>
          <p className='tracking-widest font-extrabold'>IO</p>
        </div>

        <h2 className='text-2xl text-[#191D23] font-semibold pt-4'>Forgot Password?</h2>

        <p className=' text-[#999DA3] text-sm font-normal mt-6'>Enter your email address to get the password reset link </p>

        <form action="" className='grid pt-8'>

          <label className='mt-6 flex justify-start text-[#191D23] text-base font-medium'>Email Address</label>
          <input type="email" placeholder="johndoe@gmail.com" className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words '/>
  
          <button className='h-12 bg-pry-col mt-4 rounded-[4px] text-white font-semibold text-base'>Password Reset</button>

         <Link to="/">
         <p className='text-[#999DA3] text-sm font-normal mt-8'>Back to login</p>
         </Link> 
        </form>
      </div>
    
        
         
        </div>
  )
}

export default ForgotPassword