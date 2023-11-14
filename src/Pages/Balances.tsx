import React, { useState } from 'react'

import BalanceCards from '../components/BalanceCards'
import AddAccountForm from '../components/AddAccountForm'

const Balances = () => {
  const [activeAccountForm , setActiveAccountForm] = useState(false)

  return (
    <div className=' pt-4 w-full'>
      <AddAccountForm activeAccountForm={activeAccountForm} setActiveAccountForm={setActiveAccountForm}/>
              <BalanceCards activeAccountForm={activeAccountForm} setActiveAccountForm={setActiveAccountForm} />
              
    </div>
  )
}

export default Balances