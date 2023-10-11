import React, {useState, useEffect} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import {GrFormNext} from 'react-icons/gr'

const UpcomingBill = () => {
  const [upcoming, setUpcoming] = useState<{ [x: string]: any }[]>([]);

    const upcomingRef = collection(db, "upcomingBill")

    // function to get data from firestore
    useEffect(() => {
        const getUpcoming = async () => {

            try{
                const data =  await getDocs(upcomingRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                setUpcoming(filteredData)
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getUpcoming()
    }, [])
  return (
    <div>
        
        <div className='flex justify-between items-center w-[352px] text-gray02'>
            <h3 className='text-left  text-[22px]'>Upcoming Bill</h3>
            <button className='flex items-center text-xs'>View All
            <GrFormNext className='w-4 h-4'/>

            </button>
        </div>

        <div className='h-[232px] w-[352px] bg-[#FFF] px-6 pb-5 mt-2 divide-y space-y-4'>

          {upcoming.map((data) => (
            <div key={data.company} className='flex items-center justify-between pt-5'>
              <div className='flex items-center space-x-2'>
                <div className='w-11 h-[66px] bg-special flex flex-col justify-center items-center text-xs font-normal'>
                  {data.billDate.split(' ')[0]}<br /> <span className='text-defaultBlack text-[22px] font-extrabold pt-2'>
                    {data.billDate.split(' ')[1]}
                  </span>
                  
                </div>

                <div className='text-left'>
                  <p className='text-sm font-semibold'>{data.company}</p>
                  <p className='text-secondary font-bold'>{data.company} - {data.duration}</p>
                  <p className='text-gray03  text-xs'>Last charge - {data.lastCharge}</p>
                </div>
              </div>

              <div className='w-[68px] h-10 border rounded-lg flex justify-center items-center text-secondary font-bold'>
                ${data.price}
              </div>
            </div>
          ))}
        </div>
    </div>
    
  )
}

export default UpcomingBill