import React, { useEffect, useState , useMemo, useRef} from 'react'
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectActiveButton } from '../redux/buttonSlice';
import {  selectExpenses, selectRevenues, } from '../redux/revenueAndExpensesSlice'
import {PiGameController} from 'react-icons/pi'

const RecentTransactionFullTable = () => {
  const activeButton = useSelector(selectActiveButton)
  const expenses = useSelector(selectExpenses)
  const revenue = useSelector(selectRevenues)
  const revenuesAndExpenses = useMemo(() => expenses.concat(revenue), [expenses, revenue]);

  const [tableDetails, setTableDetails] = useState(revenuesAndExpenses);
  // const prevTableDetails = useRef(revenuesAndExpenses);
  useEffect(() => {
    let updatedTableDetails;

    if (activeButton === 'expenses') {
      updatedTableDetails = expenses;
    } else if (activeButton === 'revenue') {
      updatedTableDetails = revenue;
    } else {
      updatedTableDetails = revenuesAndExpenses;
    }

    // Set the new state directly
    setTableDetails(updatedTableDetails);
  }, [activeButton, expenses, revenue, revenuesAndExpenses]);


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
    
  }, [controls, inView]);

  return (
    <motion.div 
    ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {opacity: 0, y: 75},
        visible: {opacity: 1, y: 0},
      }}
      transition={{duration: 1}}
    className='w-full  mt-6 px-7 pb-14 rounded-2xl bg-[#FFF] overflow-x-scroll md:overflow-x-hidden'>
        <table className='w-[720px] md:w-full divide-y '>
          <thead>
            <tr>
                  <th className='pt-6 pb-4 text-left'>Items</th>
                  <th className='pt-6 pb-4'>Shop Name</th>
                  <th className='pt-6 pb-4'>Date</th>
                  <th className='pt-6 pb-4'>Payment Method</th>
                  <th className='pt-6 pb-4'>Amount</th>
              </tr>
          </thead>
            

            <tbody className='divide-y'>
              {tableDetails.map((details, id) => (
                  <tr key={id} >
                    <td className='pt-4 pb-4 flex items-center font-semibold gap-4 capitalize text-defaultBlack'><PiGameController/>{details.item}</td>
                    <td className='pt-4 pb-4 text-gray01 font-medium'>{details.name}</td>
                    <td className='pt-4 pb-4 text-gray01 font-medium'>27 July, 2020</td>
                    <td className='pt-4 pb-4 text-gray01 font-medium'>Credit card</td>
                    <td className='pt-4 pb-4  text-defaultBlack font-semibold'>${details.amount}</td>
                  </tr>
                  
                ))}
            </tbody>
             
            
        </table>

        <button className='mt-8 px-6 py-3 bg-pry-col text-[#FFF] font-bold'>Load More</button>
    </motion.div>
  )
}

export default RecentTransactionFullTable