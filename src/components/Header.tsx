import {MdKeyboardDoubleArrowRight} from 'react-icons/md'
import {IoMdNotifications} from 'react-icons/io'
import {RxHamburgerMenu} from 'react-icons/rx'
import { useSelector, useDispatch } from 'react-redux'
import { selectuserDetails } from '../redux/profileDetailsSlice'
import { selectNAv, setNav } from '../redux/navSlice'

const Header = () => {
    const nav = useSelector(selectNAv)
    const userDetails = useSelector(selectuserDetails)
    const dispatch = useDispatch()


    // this function gets the current date 
    function getFormattedDate() {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        const today = new Date();
        const month = months[today.getMonth()];
        const year = today.getFullYear();
        const date = today.getDate();
    
        return `${month} ${date}, ${year}`;
    }
    
    const formattedDate = getFormattedDate();

    
  return (
    <header className='sticky py-5 flex justify-between items-center'>
        <div className='flex items-center gap-6'>
            <h1 className='text-[191919] text-2xl font-bold capitalize'>Hello {userDetails.username}</h1>

            <div className=' items-center text-gray03  text-sm hidden lg:flex'>
                <MdKeyboardDoubleArrowRight className='w-6 h-6' />
                <p>{formattedDate}</p>
            </div>
        </div>

        <div className=' hidden md:flex items-center space-x-10'>
            <IoMdNotifications className='w-6 h-6 text-[#666666]'/>
            <form>
        <label className="relative block">
            <input
                className="w-[352px] h-12 bg-white placeholder:font-italitc shadow-[0_26px_26px_0px_rgba(106, 22, 58, 0.04)]  py-2 pl-3 pr-10 focus:outline-none rounded-xl"
                placeholder="Search here" type="text" />

            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                    height="30" viewBox="0 0 30 30">
                    <path
                        d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                    </path>
                </svg>
            </span>
        </label>
    </form>
        </div>
        
        <div className='lg:hidden text-2xl text-gray-02' onClick={() => {
            dispatch(setNav(!nav))
        }}>
          <RxHamburgerMenu/>

        </div>
        
        </header>
  )
}

export default Header