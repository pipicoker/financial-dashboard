 import React, { useState } from 'react'
 import {Link, useNavigate} from 'react-router-dom'
 import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'

 import {auth, googleProvider} from '../config/firebase'
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signUp = async(e: any) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth,  email, password)
    
    .then((userCredential) => {
      // const user = userCredential.user
      navigate("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
  });
  }

  const signInWithGoogle = async (e: any) => {
    e.preventDefault()
    await signInWithPopup(auth, googleProvider)
    
    
    .then((userCredential) => {
      // const user = userCredential.user
      navigate("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
  });
    
  }
  return (
    <div className='flex justify-center items-center bg-[#F4F5F7] pt-[64px] pb-[268px]'>
      <div className='w-[400px] h-[596px]'>
        <div className='flex justify-center text-pry-col text-ll'>
          <p className=' tracking-widest font-extrabold '>FINE</p>
          <p className='font-medium  text-pry-col text-ll'>bank.</p>
          <p className='tracking-widest font-extrabold'>IO</p>
        </div>

        <h2 className='text-2xl text-[#191D23] font-semibold pt-4'>Create an account</h2>

        <form action="" className='grid pt-8'>
            <label className='flex justify-start text-[#191D23] text-base font-medium'>Name</label>
          <input 
          type="text" placeholder="Ekere Princess" className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words '/>

          <label className='mt-6 flex justify-start text-[#191D23] text-base font-medium'>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)}
          type="email" placeholder="johndoe@gmail.com" className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words '/>

          <div className='mt-6 flex justify-between items-center font-medium'>
            <label className='text-[#191D23] text-base '>Password</label>
          </div>
          <input onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder='..............' className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words tracking-widest'/>
          
          {/* <div className='flex items-center mt-8 space-x-4' >
            <input type="checkbox"/>
            <label className='text-[#191D23]font-light text-base'>Keep me signed in</label>
          </div>  */}
          <p className='flex justify-start text-[#999DA3] text-sm font-normal mt-6'>By continuing, you agree to our  <span className='text-pry-col'> terms of service</span> </p>

          <button onClick={signUp}
          className='h-12 bg-pry-col mt-4 rounded-[4px] text-white font-semibold text-base'>Sign Up</button>
          
          <p className='text-[#999DA3] text-sm font-normal mt-6'>-------------- or sign up with -------------- </p>

          <button onClick={signInWithGoogle} className='bg-[#E4E7EB] rounded-[4px] h-12 text-[#4B5768] text-base font-normal mt-6 flex justify-center items-center space-x-4'>
            <FcGoogle className='text-lg'/>
            <p >Continue with Google</p>
          </button>

          <p className='text-[#999DA3] text-sm font-normal mt-10'>Already have an account? 
          <Link to="/"
          className='text-pry-col font-semibold '>
            Sign in here 
            </Link></p>
        </form>
      </div>
    
        
         
        </div>
  )
}

export default SignUp