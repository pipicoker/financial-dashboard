import React, { useEffect, useRef, useState } from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import {Routes, Route,} from 'react-router-dom'
import { setExpenses, setRevenues } from '../redux/revenueAndExpensesSlice'
import { setUpcoming } from '../redux/upcomingBillSlice'
import { useDispatch } from 'react-redux'
import { setExpenseBreakdown} from '../redux/expensesSlices';

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
  const goalsRef = collection(db, "expensesBreakdown")


    // function to get data from firestore
    useEffect(() => {
        const getUpcoming = async () => {

            try{
                const data =  await getDocs(upcomingRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                dispatch(setUpcoming(filteredData))
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getUpcoming()
    }, [])


    // function to get data from firestore
    useEffect(() => {
      const getExpenses = async () => {

          try{
              const data =  await getDocs(expensesRef)
              const filteredData = data.docs.map((doc) => ({
                  ...doc.data()
              }))
              dispatch(setExpenses(filteredData))
              // console.log('Expenses:', expenses);
              
          } catch (err) {
              console.error(err);
              
          }
          
      }
      getExpenses()
  }, [])


    // function to get data from firestore
    useEffect(() => {
        const getRevenues = async () => {

            try{
                const data =  await getDocs(revenuesRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                dispatch(setRevenues(filteredData))
                
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getRevenues()
    }, [])


    // function to get data from firestore
    useEffect(() => {
        const getBreakdown = async () => {

            try{
                const data =  await getDocs(goalsRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                dispatch(setExpenseBreakdown(filteredData))
                
            } catch (err) {
                console.error(err);
               
                
                
            } 
            
        }
        getBreakdown()
    }, [])
  return (
    <div className='flex '>
      <Sidebar/>
      <div className='bg-[#F4F5F7] divide-y divide-gray05 pb-8'>
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
