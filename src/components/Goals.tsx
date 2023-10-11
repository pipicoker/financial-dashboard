import React, {useState, useEffect} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import {FiEdit3} from 'react-icons/fi'
import {GoGoal} from 'react-icons/go'
import {PiMedalMilitaryThin} from 'react-icons/pi'
import GaugeChart from './GaugeChart';

const Goals = () => {
    const [goals, setGoals] = useState<{ [x: string]: any }[]>([]);

    const goalsRef = collection(db, "goals")

    // function to get data from firestore
    useEffect(() => {
        const getGoals = async () => {

            try{
                const data =  await getDocs(goalsRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                setGoals(filteredData)
                
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getGoals()
    }, [])

    // this is function is used to get the current date
    function getFormattedDate() {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        const today = new Date();
        const month = months[today.getMonth()];
        const year = today.getFullYear();
        const date = today.getDate();
    
        return `${month}, ${year}`;
    }
    
    const formattedDate = getFormattedDate();
  return (
    <div>
        <h3 className='text-left text-gray02 text-[22px]'>Goals</h3>

        <div className='h-[232px] w-[352px] bg-[#FFF] px-6 py-5 mt-2 '>
           {
            goals.map((goal) => (
                <div key={goal.target} className='divide-y '>
                    <div className='flex items-center justify-between pb-3'>

                        <div className='flex items-center space-x-3'>
                            <p className='text-[22px] font-extrabold'>${goal.target}</p>

                            <div className='w-8 h-8 rounded-[4px]  flex justify-center items-center bg-special'>
                                <FiEdit3 className='w-4 h-4'/>
                            </div>
                        </div>

                        <p className='text-sm font-medium text-secondary'>{formattedDate}</p>
                    </div>
                    
                    <div className='pt-[26px] grid grid-cols-2'>
                        <div>

                            <div className='flex space-x-1'>
                                <PiMedalMilitaryThin />
                                <div>
                                    <p className='text-gray02 text-xs'>Target Achieved</p>
                                    <p className='font-bold text-defaultBlack text-left'>${goal.targetAchieved}</p>
                                </div>
                                
                            </div>

                            <div className='flex pt-6 space-x-1'>
                                <GoGoal />
                                <div>
                                    <p className='text-gray02 text-xs'>This month target</p>
                                    <p className='font-bold text-defaultBlack text-left'>${goal.target}</p>
                                </div>
                                
                            </div>

                        </div>

                        {/* <div>
                            <GaugeChart />
                        </div> */}
                    </div>
                </div>
            ))
           }
        </div>
    </div>
  )
}

export default Goals