import React from 'react'
import {useQuery} from 'react-query'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import {Routes, Route,} from 'react-router-dom'
import { setExpenses, setRevenues } from '../redux/revenueAndExpensesSlice'
import { setUpcoming,  } from '../redux/upcomingBillSlice'
import { setUserDetails } from '../redux/profileDetails'
import { useDispatch } from 'react-redux' 
import { setExpenseBreakdown} from '../redux/expensesSlices';
import { setGoals } from '../redux/goalsSlice'

import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview'
import Header from '../components/Header'
import Balances from './Balances'
import AccountDetails from './AccountDetails'
import Transactions from './Trasactions'
import Bills from './Bills'
import ExpensesPage from './ExpensesPage'
import GoalsPage from './GoalsPage'
import SettingsPage from './SettingsPage'

const Home = () => {
  const dispatch = useDispatch()

  const expensesRef = collection(db, "expenses")
  const revenuesRef = collection(db, "revenue")
  const upcomingRef = collection(db, "upcomingBill")
  const breakdownRef = collection(db, "expensesBreakdown")
  const goalsRef = collection(db, "goals")
  const userDetailsRef = collection(db, "userDetails")


    // function to get upcoming bill data from firestore
    const getUpcoming = async () => {
        try {
          const data = await getDocs(upcomingRef);
          return data.docs.map((doc) => ({
            ...doc.data(),
          }));
        } catch (err) {
          throw new Error('Failed to fetch card list');
        }
      };

  useQuery('upcoming', getUpcoming, {
        refetchOnWindowFocus: false, 
        onSuccess: (fetchedData) => {
            dispatch(setUpcoming(fetchedData))
        }
      });


    // function to get expenses data from firestore
    const getExpenses = async () => {
        try {
          const data = await getDocs(expensesRef);
          return data.docs.map((doc) => ({
            ...doc.data(),
          }));
        } catch (err) {
          throw new Error('Failed to fetch card list');
        }
      };

  useQuery('expenses', getExpenses, {
        refetchOnWindowFocus: false, 
        onSuccess: (fetchedData) => {
            dispatch(setExpenses(fetchedData))
        }
      });

    // function to get revenues data from firestore
    const getRevenues = async () => {
        try {
          const data = await getDocs(revenuesRef);
          return data.docs.map((doc) => ({
            ...doc.data(),
          }));
        } catch (err) {
          throw new Error('Failed to fetch card list');
        }
      };

  useQuery('revenues', getRevenues, {
        refetchOnWindowFocus: false, 
        onSuccess: (fetchedData) => {
            dispatch(setRevenues(fetchedData))
        }
      });

    // function to get transaction breakdown data from firestore
    const getBreakdown = async () => {
        try {
          const data = await getDocs(breakdownRef);
          return data.docs.map((doc) => ({
            ...doc.data(),
          }));
        } catch (err) {
          throw new Error('Failed to fetch card list');
        }
      };

  useQuery('breakdown', getBreakdown, {
        refetchOnWindowFocus: false, 
        onSuccess: (fetchedData) => {
            dispatch(setExpenseBreakdown(fetchedData))
        }
      });    

    
    // function to get goals  data from firestore
    const getGoals = async () => {

      try{
          const data =  await getDocs(goalsRef)
          return data.docs.map((doc) => ({
              ...doc.data(),
            }));     
          
      } catch (err) {
          console.error(err);
          
      } 
  }

  useQuery('goals', getGoals, {
      refetchOnWindowFocus: false, 
      onSuccess: (fetchedData) => {
          dispatch(setGoals(fetchedData ?? []))
      }
    });



    // function to get user details from firestore
    const getUserDetails = async () => {
      try {
        const querySnapshot = await getDocs(userDetailsRef);
        
        if (querySnapshot.empty) {
          throw new Error('No user details found.');
        }
    
        const data = querySnapshot.docs[0].data(); // Assuming there's only one document
    
        return data;
      } catch (err) {
        throw new Error('Failed to fetch user details');
      }
    };
    
    useQuery('details', getUserDetails, {
      refetchOnWindowFocus: false,
      onSuccess: (fetchedData) => {
        const userDetailData = {
          fullName: fetchedData.fullName,
          email: fetchedData.email,
          phoneNumber: fetchedData.phoneNumber,
          username: fetchedData.username,
        };
        dispatch(setUserDetails(userDetailData));
      },
    });
    
  return (
    <div className='flex '>
      <Sidebar/>
      <div className='bg-[#F4F5F7] w-full md:w-4/5 px-4 md:pr-8 md:pl-6 divide-y divide-gray05 pb-8'>
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/Balances/*" element={<Balances />} />
          <Route path="/Balances/AccountDetails" element={<AccountDetails/>} />
          <Route path='/Transactions' element={<Transactions/>}/>
          <Route path='/Bills' element={<Bills/>}/>
          <Route path='/ExpensesPage' element={<ExpensesPage/>}/>
          <Route path='/GoalsPage' element={<GoalsPage/>}/>
          <Route path='/SettingsPage' element={<SettingsPage/>}/>
        </Routes>
        
      </div>
      
    </div> 
  )
}

export default Home
