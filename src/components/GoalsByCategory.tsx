import React, { useRef, useEffect } from 'react'
import { useAnimation, motion, useInView } from "framer-motion";import { useSelector, useDispatch } from 'react-redux'
import { selectGoalCategory } from '../redux/goalsByCategorySlice'
import { setActiveAdjustForm, selectActiveAdjustForm, selectCategoryTargetAmount, setOpenedCategory, selectOpenedCategory } from '../redux/goalsFormSlice'
import {FiEdit3} from 'react-icons/fi'
  
const GoalsByCategory= () => {
  
 const dispatch = useDispatch()
 const categoryTargetAmount = useSelector(selectCategoryTargetAmount)
  const activeAdjustForm = useSelector(selectActiveAdjustForm)
    const goalsCategory = useSelector(selectGoalCategory) 
    const openedCategory = useSelector(selectOpenedCategory)

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
      transition={{ duration: .5 }}
    className='mt-8 w-full'>
        <h3 className='text-left text-gray02 text-[22px]' >Expenses Goals by Category</h3>

        <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          hidden: {opacity: 0, x: 75},
          visible: {opacity: 1, x: 0},
        }}
        transition={{ duration: .5 }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {goalsCategory && goalsCategory.map((data, index) => (
            <div 
            
            key={data.id} 
            className='flex items-center justify-between bg-[#FFF] rounded-lg px-4 py-7 capitalize hover:scale-105 duration-500'>

              <div className='flex space-x-4'>
                <div className='w-10 h-12 flex bg-special justify-center items-center rounded-lg'>
                  <img src={data.logo} alt="logo" className='w-6 h-6' />
                </div>

                <div className='text-left'>
                  <p className='text-gray03 font-medium'>{data.type}</p>
                  <p className='text-lg font-extrabold text-defaultBlack'>${openedCategory === data.id && categoryTargetAmount !== "" ?  `${categoryTargetAmount}` : data.amount}.00</p>
                </div>
              </div>
              

              <button className='flex items-center px-4 py-2 rounded-[4px] border border-pry-col text-pry-col'
              onClick={()=> {
                dispatch(setOpenedCategory(data.id))
                // console.log(data.id)
                dispatch(setActiveAdjustForm({ index, value: !activeAdjustForm }));
              }}
              >Adjust <FiEdit3 className='ml-2'/></button>
            </div>
          ))}
        </motion.div>
    </motion.div>
  )
}




export default (GoalsByCategory);
