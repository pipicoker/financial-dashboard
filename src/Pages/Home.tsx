import React from 'react'
import {Routes, Route,} from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview'
import Header from '../components/Header'
import Balances from './Balances'

const Home = () => {
  return (
    <div className='flex '>
      <Sidebar/>
      <div className='bg-[#F4F5F7] divide-y divide-gray05 pb-8'>
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/Balances" element={<Balances />} />
        </Routes>
        
      </div>
      
    </div>
  )
}

export default Home
