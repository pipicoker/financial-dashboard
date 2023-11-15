import React, { useEffect, useRef } from 'react'
import {useAnimation, motion, useInView} from 'framer-motion'
import { Link } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import RecentTransactioBtns from './RecentTransactioBtns'
import AllExpensesAndRevenue from './AllExpensesAndRevenue'

const RecentTransactions = () => {

    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref)

    useEffect(() => {
        if(inView) {
            controls.start('visible')
        }
        else{
            controls.start('hidden')
        }
    }, [controls, inView])
    
    return (

    <motion.div 
    ref={ref}
    animate={controls}
    initial="hidden"
    variants={{
        hidden: {opacity: 0, y: 75},
        visible: {opacity: 1, y: 0},
      }}
      transition={{duration: .5}}
    className='md:w-1/3'>
        
        <motion.div className='flex justify-between items-center w-full text-gray02 '>
            <h3 className='text-left  text-[22px]'>Recent Transactions</h3>
            <Link to="/Home/Transactions">
            <button className='flex items-center text-xs'>View All
            <GrFormNext className='w-4 h-4'/>

            </button>
            </Link>
        </motion.div>

        <div className='w-full mt-2 bg-[#FFF] px-6 pt-4 pb-[34px] rounded-lg'>

            <div>
                <RecentTransactioBtns />
                <AllExpensesAndRevenue />

              


                
                
                
            </div>
        </div>
    </motion.div>
  )
}

export default RecentTransactions