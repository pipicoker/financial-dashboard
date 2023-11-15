import React, { useRef, useEffect } from 'react'
import { useAnimation, motion, useInView } from "framer-motion";import { useSelector } from 'react-redux'
import { selectUpcoming } from '../redux/upcomingBillSlice'

const FullUpcomingBills = () => {
    const upcoming = useSelector(selectUpcoming)

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
          hidden: {opacity: 0, y: 75},
          visible: {opacity: 1, y: 0},
        }}
        transition={{duration: .5}}
     className=''>
        <h3 className='text-left text-gray02 text-[22px]' >Upcoming Bills</h3>

        <div 
        
        className='w-full mt-5 p-6 rounded-2xl bg-[#FFF] overflow-x-scroll md:overflow-x-hidden'>

            <table className='w-[720px] md:w-full divide-y text-left'>
                <thead>
                    <tr className=' '>
                        <th className='pb-6 font-bold text-defaultBlack'>Due Date</th>
                        <th className='pb-6 font-bold text-defaultBlack'>Logo</th>
                        <th className='pb-6 font-bold text-defaultBlack'>Item Description</th>
                        <th className='pb-6 font-bold text-defaultBlack'>Last Charge</th>
                        <th className='pb-6 font-bold text-defaultBlack flex'>Amount</th>
                    </tr>
                </thead>
                

                <tbody>
                    {upcoming.map((upcomingBill, id) => (
                        <tr key={id} className=''>
                            <td className='my-8 w-[56px] flex justify-center items-center text-secondary bg-special px-3 py-3 rounded-lg  text-[22px] font-bold capitalize'>{upcomingBill.billDate}</td>

                            <td className=''><img src={upcomingBill.pix}alt="company logo" className='w-[120px] h-10 table-cell'/></td>

                            <td className='w-3/12'>
                                <p className='text-lg font-bold text-defaultBlack'>{upcomingBill.company} - {upcomingBill.duration} Plan</p>
                                <p className='text-sm text-gray03'>{upcomingBill.description}</p>
                                </td>
                            <td className='text-sm text-gray03'>{upcomingBill.lastCharge}</td>
                            <td className=''><p className='border rounded-lg w-[108px] h-12 px-6 py-3 flex justify-center items-center'>${upcomingBill.price}</p>
                                </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            
        </div>
        
    </motion.div>
  )
}

export default FullUpcomingBills