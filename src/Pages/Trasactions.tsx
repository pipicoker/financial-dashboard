// import React, {useEffect, useRef} from 'react'
// import {useAnimation, motion, useInView} from 'framer-motion'
import RecentTransactioBtns from '../components/RecentTransactioBtns'
import RecentTransactionFullTable from '../components/RecentTransactionFullTable'



const RecentTransactionPage = () => {

  // const controls = useAnimation()
  // const ref = useRef(null)
  // const inView = useInView(ref)

  // useEffect(() => {
  //     if(inView) {
  //         controls.start('visible')
  //     }
  //     else{
  //         controls.start('hidden')
  //     }
  // }, [controls, inView])

  return (
    <div 
    
    className='pt-4 w-full'>
         <h3 className='text-left text-gray02 text-[22px] mb-4'>Recent Transaction</h3>
         <RecentTransactioBtns />
         <RecentTransactionFullTable />
         {/* <div>
         {activeButton === 'all' && (
                        <FullExpensesAndRevenue />
                    )}
                    {activeButton === 'revenue' && (
                        <FullRevenue />
                    )}
                    {activeButton === 'expenses' && (
                        <FullExpenses />
                    )}
         </div> */}
    </div>
  )
}

export default RecentTransactionPage