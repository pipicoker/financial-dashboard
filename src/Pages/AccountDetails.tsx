import React from 'react'
import BalancesAccountDetails from '../components/BalancesAccountDetails'
import BalanceTransactionHistory from '../components/BalanceTransactionHistory'

const AccountDetails = () => {
  return (
    <div className=' pt-4 '>
      <BalancesAccountDetails />
      <BalanceTransactionHistory />
    </div>
  )
}

export default AccountDetails 