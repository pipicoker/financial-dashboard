import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SidebarData from '../data/SidebarData'
import {FiLogOut} from 'react-icons/fi'
import { selectNAv, setNav } from '../redux/navSlice'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const nav = useSelector(selectNAv)
  return (
    <nav className={`bg-defaultBlack w-3/5 lg:w-1/5    lg:flex  flex-col justify-start pt-12 px-7   ${nav ? 'flex absolute z-[1000] ease-in-out duration-500' : 'hidden' }` }>
        
        <div className='flex justify-center'>
            <div className='flex justify-center  text-white text-2xl'>
                <p className=' tracking-widest font-extrabold '>FINE</p>
                <p className='font-medium '>bank.</p>
                <p className='tracking-widest font-extrabold'>IO</p>
            </div>
        </div>

        <div className="pt-10">
      {SidebarData.map((data) => (
        <Link to={data.path} key={data.id}>
          <div
          onClick={() => dispatch(setNav(false))}
            className={` flex items-center gap-3 font-semibold text-base mb-3 py-3 pl-4 transition duration-500 ${
              location.pathname === data.path ? 'bg-pry-col text-[#FFF] rounded-[4px]' : 'text-greyish2 bg-defaultBlack'
            }`}
          >
            {data.icon({ size: '24' })}
            <p>{data.title}</p>
          </div>
        </Link>
      ))}
    </div>

        <div className='mt-[200px] divide-y '>
            <button className='flex items-center  gap-3 font-semibold text-base bg-greyish w-full  rounded-[4px]  py-3 px-4 mb-11 text-greyish2'>
                <FiLogOut className=''/>
                Logout
            </button>
        
            <div className='pt-8 flex items-center space-x-3'>
                <img src="https://media.istockphoto.com/id/1406308214/photo/portrait-of-mature-multiracial-asian-businessman-in-office-hallway-smiling.jpg?s=612x612&w=0&k=20&c=uIhJqBL2lyg4zZN0Mdx7jHARJiA3NJCE66IPYu6l93M=" alt="" className='w-8 h-8 rounded-[32px]'/>

                <div className=''>
                    <p className='font-semibold text-[#FFF]'>Tanzir Rahman</p>
                    <p className='text-xs text-greyish2 flex justify-start'>View Profile</p>
                </div>
            </div>
        </div>
        
        
        
    </nav>
  )
}

export default Sidebar