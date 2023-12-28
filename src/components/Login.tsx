import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useForm  } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAnimation, motion, useInView } from "framer-motion";

import {Link, useNavigate} from 'react-router-dom'
import {auth, googleProvider} from '../config/firebase'
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'

import { setUser } from '../redux/userCredentialsSlice';
import { FcGoogle } from 'react-icons/fc';

interface FormInputs {
  email: string,
  password: string
}
const Login = () => {
  const dispatch = useDispatch()

  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>({
    criteriaMode: "all"
  });
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onLogin = (e: any) => {

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
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const userr = auth.currentUser;
      // dispatch(setUser(auth.currentUser))
  if (userr) {
    console.log('User signed in:', userCredential.user);
    dispatch(setUser(userCredential.user))
      navigate("/Home")
    // User is signed in, handle accordingly
  } else {
    console.log("user not signed in");
    
    // Authentication failed or user not signed in, handle the error
  }
      // Handle authentication success
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle authentication failure
    } 

  }

  // useEffect(() => {
  //   if (user != null) {
  //     navigate("/Home")
  //   }
  // }, [user])

  const controls = useAnimation();
  const animref = useRef(null)
  const inView = useInView(animref)

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    else {
      controls.start("hidden");
    }
    
  }, [controls, inView]);

  return (
    <motion.div 
    ref={animref}
    animate={controls}
    initial="hidden"
    variants={{
      hidden: {opacity: 0, y: -75},
      visible: {opacity: 1, y: 0},
    }}
    transition={{ duration: .5 }}
    className='flex justify-center items-center bg-[#F4F5F7] pt-[64px] pb-[268px]'>
      <div className='w-5/6 lg:w-[400px] h-[596px]'>
        <div className='flex justify-center text-pry-col text-ll'>
          <p className=' tracking-widest font-extrabold '>FINE</p>
          <p className='font-medium  text-pry-col text-ll'>bank.</p>
          <p className='tracking-widest font-extrabold'>IO</p>
        </div>

        <form action="" 
        onSubmit={handleSubmit(onLogin)}
        className='grid pt-16'>
          <label className='flex justify-start text-[#191D23] text-base font-medium'>Email Address</label>
          <input 
          {...register('email', 
          {required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "This is not a valid email"
          }
        })}
          onChange={(e)=>setEmail(e.target.value)}  
          name='email'
          type="email" 
          placeholder="johndoe@gmail.com"
          className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words '/>
          
          <ErrorMessage
        errors={errors}
        name="email"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type} className='text-red-400 text-left text-sm font-semibold'>{message}</p>
          ))
        }
      />
         

          <div className='mt-6 flex justify-between items-center font-medium'>
            <label className='text-[#191D23] text-base '>Password</label>
            <Link to="./ForgotPassword">
            <p className='text-pry-col text-xs'>Forgot password?</p>
            </Link>
          </div>
          <input 
          {...register('password', 
          {required: "Password is required",
          minLength : {
            value: 5,
            message: "Password must be more than 5 characters"
          }
        })} 
          onChange={(e)=>setPassword(e.target.value)}
          name='password'
           type="password" 
           placeholder='..............' 
           className='h-12 px-4 py-3 text-base text-[4B5768] rounded-lg break-words tracking-widest'/>
           <ErrorMessage
        errors={errors}
        name="password"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type} className='text-red-400 text-left text-sm font-semibold'>{message}</p>
          ))
        }
      />
           
          
          <div className='flex items-center mt-8 space-x-4' >
            <input type="checkbox"/>
            <label className='text-[#191D23]font-light text-base'>Keep me signed in</label>
          </div> 

          <button 
          onClick={onLogin}
          className='h-12 bg-pry-col mt-4 rounded-[4px] text-white font-semibold text-base'>Login</button>
          
          <p className='text-[#999DA3] text-sm font-normal mt-6'>-------------- or sign in with -------------- </p>

          <button onClick={signInWithGoogle}
          className='bg-[#E4E7EB] rounded-[4px] h-12 text-[#4B5768] text-base font-normal mt-6 flex justify-center items-center space-x-4'>
            <FcGoogle className='text-lg'/>
            <p >Continue with Google</p>
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