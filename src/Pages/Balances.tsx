import React, { useState } from 'react'
import {Routes, Route,} from 'react-router-dom'

import BalanceCards from '../components/BalanceCards'
import AddAccountForm from '../components/AddAccountForm'
import AccountDetails from './AccountDetails'

const Balances = () => {
  const [activeAccountForm , setActiveAccountForm] = useState(false)

  return (
    <div className='px-6 pt-4 '>
      <AddAccountForm activeAccountForm={activeAccountForm} setActiveAccountForm={setActiveAccountForm}/>
              <BalanceCards activeAccountForm={activeAccountForm} setActiveAccountForm={setActiveAccountForm} />
              {/* <Routes>
                <Route path="./AccountDetails" element={<AccountDetails />} />
               </Routes> */}
        
    </div>
  )
}

export default Balances