import React, { useRef, useEffect } from 'react'
import { useAnimation, motion, useInView } from "framer-motion";// import { getDocs, collection } from 'firebase/firestore';

import { useSelector, useDispatch } from 'react-redux';
import {selectActiveForm, setActiveForm, selectPresentAmount, selectTargetAmount,} from '../redux/goalsFormSlice'
import { selectGoals } from '../redux/goalsSlice';
import {FiEdit3} from 'react-icons/fi'
import {GoGoal} from 'react-icons/go'
import {PiMedalMilitaryThin} from 'react-icons/pi'
import GaugeChart from './GaugeChart';

const Goals = () => {
    const activeForm = useSelector(selectActiveForm)
    const targetAmount = useSelector(selectTargetAmount)
    const presentAmount = useSelector(selectPresentAmount)
    const goals = useSelector(selectGoals)
    const dispatch = useDispatch();



    // this is function is used to get the current date
    function getFormattedDate() {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        const today = new Date();
        const month = months[today.getMonth()];
        const year = today.getFullYear();
        // const date = today.getDate();
    
        return `${month}, ${year}`;
    }
    
    const formattedDate = getFormattedDate();

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
      transition={{ duration: 1 }}
    className=' '>
        <h3 className='text-left text-gray02 text-[22px]'>Goals</h3>

        <div className='h-[232px]  bg-[#FFF] px-6 py-5 mt-2 rounded-lg'>
           {
            goals.map((goal, id) => (
                <div key={id} className='divide-y '>
                    <div className='flex items-center justify-between pb-3'>

                        <div className='flex items-center space-x-3'>
                            <p className='text-[22px] font-extrabold'>${targetAmount ? `${targetAmount}` : goal.target}</p>

                            <div className='w-8 h-8 rounded-[4px]  flex justify-center items-center bg-special' onClick={() => dispatch(setActiveForm(!activeForm))}>
                                <FiEdit3 className='w-4 h-4'/>
                            </div>
                        </div>

                        <p className='text-sm font-medium text-secondary'>{formattedDate}</p>
                    </div>
                    
                    <div className='pt-[26px] grid grid-cols-2 '>
                        <div>

                            <div className='flex space-x-1'>
                                <PiMedalMilitaryThin />
                                <div>
                                    <p className='text-gray02 text-xs'>Target Achieved</p>
                                    <p className='font-bold text-defaultBlack text-left'>${presentAmount ? `${presentAmount}` : goal.targetAchieved}</p>
                                </div>
                                
                            </div>

                            <div className='flex pt-6 space-x-1'>
                                <GoGoal />
                                <div>
                                    <p className='text-gray02 text-xs'>This month target</p>
                                    <p className='font-bold text-defaultBlack text-left'>${targetAmount ? `${targetAmount}` : goal.target}</p>
                                </div>
                                
                            </div>

                        </div>

                       <div>
                        <GaugeChart />
                        
                       </div>
                    </div>
                </div>
            ))
           }
        </div>
    </motion.div>
  )
}

export default Goals