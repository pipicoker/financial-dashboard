import { Link } from 'react-router-dom';
import {GrFormNext} from 'react-icons/gr'
import { useSelector,  } from 'react-redux';
import { selectUpcoming } from '../redux/upcomingBillSlice';

const UpcomingBill = () => {
  const upcoming = useSelector(selectUpcoming)

    
  return (
    <div className=''>
      
        <div className='flex justify-between items-center  text-gray02'>
            <h3 className='text-left  text-[22px]'>Upcoming Bill</h3>
            <Link to="/Home/Bills">
            <button className='flex items-center text-xs'>View All
            <GrFormNext className='w-4 h-4'/>

            </button>
            </Link>
            
        </div>

        <div className='h-[232px]  bg-[#FFF] px-6 pb-5 mt-2 divide-y space-y-4 rounded-lg'>

          {upcoming.map((data) => (
            <div key={data.company} className='flex items-center justify-between pt-5'>
              <div className='flex items-center space-x-2'>
                <div className='w-11 h-[66px] bg-special flex flex-col justify-center items-center text-xs font-normal'>
                  {data.billDate.split(' ')[0]}<br /> <span className='text-defaultBlack text-[22px] font-extrabold pt-2'>
                    {data.billDate.split(' ')[1]}
                  </span>
                  
                </div>

                <div className='text-left'>
                  {/* <p className='text-sm font-semibold'>{data.company}</p> */}
                  <img src={data.pix} alt="" className='w-11 h-4' />
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