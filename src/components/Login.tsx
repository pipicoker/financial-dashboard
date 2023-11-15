import React, { useState, useEffect, useRef } from 'react'
import { useAnimation, motion, useInView } from "framer-motion";

import {Link, useNavigate} from 'react-router-dom'
import {auth, googleProvider} from '../config/firebase'
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'

import { FcGoogle } from 'react-icons/fc';


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onLogin = (e: any) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user
      navigate("/Home")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
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

  const controls = useAnimation();
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    else {
      controls.start("hidden");
    }
    console.log(inView);
    
  }, [controls, inView]);
  return (
    <motion.div 
    ref={ref}
    animate={controls}
    initial="hidden"
    variants={{
      hidden: {opacity: 0, y: -75},
      visible: {opacity: 1, y: 0},
    }}
    transition={{ duration: 1 }}
    className='flex justify-center items-center bg-[#F4F5F7] pt-[64px] pb-[268px]'>
      <div className='w-5/6 lg:w-[400px] h-[596px]'>
        <div className='flex justify-center text-pry-col text-ll'>
          <p className=' tracking-widest font-extrabold '>FINE</p>
          <p className='font-medium  text-pry-col text-ll'>bank.</p>
          <p className='tracking-widest font-extrabold'>IO</p>
        </div>

        <form action="" className='grid pt-16'>
          <label className='flex justify-start text-[#191D23] text-base font-medium'>Email Address</label>
          <input   onChange={(e)=>setEmail(e.target.value)}  
          type="email" placeholder="johndoe@gmail.com" className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words '/>

          <div className='mt-6 flex justify-between items-center font-medium'>
            <label className='text-[#191D23] text-base '>Password</label>
            <Link to="./ForgotPassword">
            <p className='text-pry-col text-xs'>Forgot password?</p>
            </Link>
          </div>
          <input  onChange={(e)=>setPassword(e.target.value)}
           type="password" placeholder='..............' className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words tracking-widest'/>
          
          <div className='flex items-center mt-8 space-x-4' >
            <input type="checkbox"/>
            <label className='text-[#191D23]font-light text-base'>Keep me signed in</label>
          </div> 

          <button onClick={onLogin}
          className='h-12 bg-pry-col mt-4 rounded-[4px] text-white font-semibold text-base'>Login</button>
          
          <p className='text-[#999DA3] text-sm font-normal mt-6'>-------------- or sign in with -------------- </p>

          <button
          className='bg-[#E4E7EB] rounded-[4px] h-12 text-[#4B5768] text-base font-normal mt-6 flex justify-center items-center space-x-4'>
            <FcGoogle className='text-lg'/>
            <p onClick={signInWithGoogle}>Continue with Google</p>
          </button>

          <Link to="./SignUp">
          <p className='text-pry-col font-semibold mt-10'>Create an account</p>
          </Link>
        </form>
      </div>
    
        
         
        </motion.div>
  )
}

export default Login

