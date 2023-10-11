import React from 'react'
import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='flex '>
      <Sidebar/>
      <div className='bg-[#F4F5F7] divide-y divide-gray05 pb-8'>
        <Header />
        <Overview />
      </div>
      
    </div>
  )
}

export default Home
