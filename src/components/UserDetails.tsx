import React, { useEffect, useState} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'

interface UserDetail {
    fullName: string;
    email: string;
    phoneNumber: string;
    username: string;
    // Add other properties as needed
  }

const UserDetails = () => {

    const [userDetails, setUserDetails] = useState<UserDetail[]>([]); // Use the UserDetail[] type
    const userDetailsRef = collection(db, "userDetails")


    // function to get user details from firestore
    useEffect(() => {
        const getUpcoming = async () => {

            try{
                const data =  await getDocs(userDetailsRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data() as UserDetail
                }))
                setUserDetails(filteredData)
                // console.log(filteredData);
                // console.log(userDetails)
                
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getUpcoming()
    }, [])
  return (
    <div className='mt-8'>
        {
            userDetails ? 
            userDetails.map((data, index) => (
                <div key={index} >
                    <div className='text-left space-y-8'>
                        <div>
                            <h4 className='text-secondary font-semibold'>Full name</h4>
                            <p className='px-6 pt-4 text-gray02'>{data.fullName}</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Email</h4>
                            <p className='px-6 pt-4 text-gray02'>{data.email}</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Username</h4>
                            <p className='px-6 pt-4 text-gray02'>{data.username}</p>
                        </div>
                        <div>
                            <h4 className='text-secondary font-semibold'>Phone Number</h4>
                            <p className='px-6 pt-4 text-gray02'>{data.phoneNumber}</p>
                        </div>
                    </div>
                   
                
                <button className='bg-pry-col mt-[52px] flex justify-start text-[#FFF] px-6 py-3 rounded-[4px] font-bold'>Update Profile</button>
                </div>

                
            ))
        : ("no details")}
    </div>
  )
}

export default UserDetails