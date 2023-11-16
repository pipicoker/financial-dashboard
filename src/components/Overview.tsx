import React, {useEffect, useRef} from 'react'
import {useAnimation, motion, useInView} from 'framer-motion'
import TotalBalance from './TotalBalance'
import Goals from './Goals'
import UpcomingBill from './UpcomingBill'
import RecentTransactions from './RecentTransactions'
import Statistics from './Statistics'
// import ExpensesBreakdown from './ExpensesBreakdown'
import GoalsForm from './GoalsForm'

const ExpensesBreakdown = React.lazy(() => import('./ExpensesBreakdown'))

const Overview = () => {

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
    variants={{
      hidden: {opacity: 0,  y: 75,},
      visible: {opacity: 1,  y: 0,},
    }}
    transition={{duration: 1, }}
    
    className='px-2  pt-4  w-full'>
      <GoalsForm />

      <div 
      
      className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 md:justify-center items-center'>
        <TotalBalance />
        <Goals />
        <UpcomingBill />
      </div>

        <motion.div
        ref={ref}
        animate={controls}
        variants={{
          hidden: {opacity: 0,  y: 75,},
          visible: {opacity: 1,  y: 0,},
        }}
        transition={{duration: .5}}
         className='mt-8 md:flex md:space-x-4  w-full'>
          <RecentTransactions />
          <div className='md:w-3/5 lg:w-2/3'>
            <div className=''>
              <h3 className='mt-6 md:mt-0 text-[22px] text-gray02 text-left'>Statistics</h3>
              <Statistics />
            </div>
            <React.Suspense fallback={<div>Loading...</div>}>
            <ExpensesBreakdown />
          </React.Suspense>
          </div>
        </motion.div>
    </motion.div>
  )
}

export default Overview