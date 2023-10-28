import React from 'react'
import { accountDetailsSlice, selectAccountDetails } from '../redux/accountDetailsSlice';
import { useSelector } from 'react-redux';

const BalanceTransactionHistory = () => {
    const accountDetails = useSelector(selectAccountDetails)
    const transactionHistory = accountDetails.transactionHistory
  return (
    <div className='mt-8'>
         <h3 className='text-left text-gray02 text-[22px]' onClick={() => console.log(accountDetailsSlice)}>Transaction History</h3>

         <div className='w-[1104px] mt-5 roundedxl bg-[#FFF] px-8 pt-1 pb-8 '>
            <table className='w-[1104px]  divide-y text-left'>
                <tr className='text-defaultBlack   font-bold capitalize'>
                    <th className='pt-2 pb-4'>Date</th>
                    <th className='pt-2 pb-4'>Status</th>
                    <th className='pt-2 pb-4'>Trasaction</th>
                    <th className='pt-2 pb-4'>Receipt</th>
                    <th className='pt-2 pb-4'>Amount</th>
                    
                </tr>
                {transactionHistory.map((tras, id) => (
                    <tr key={id} className='text-secondary '>
                        <td className='pt-4 pb-4'>{tras.date}</td>
                        <td className='pt-4 pb-4'>{tras.status}</td>
                        <td className='pt-4 pb-4'>{tras.transType}</td>
                        <td className='pt-4 pb-4'>{tras.receipt}</td>
                        <td className='pt-4 pb-4 font-semibold text-defaultBlack'>${tras.amount}</td>
                    </tr>
                ))}
                {transactionHistory.map((tras, id) => (
                    <tr key={id} className='text-secondary'>
                        <td className='pt-4 pb-4'>{tras.date}</td>
                        <td className='pt-4 pb-4'>{tras.status}</td>
                        <td className='pt-4 pb-4'>{tras.transType}</td>
                        <td className='pt-4 pb-4'>{tras.receipt}</td>
                        <td className='pt-4 pb-4 font-semibold text-defaultBlack'>${tras.amount}</td>
                    </tr>
                ))}
            </table>
            {/* {transactionHistory.map((trans, id) => (
            <div key={id} className='grid grid-cols-5  justify-between '>
                <div className='text-left'>
                    <p className='text-defaultBlack font-bold capitalize'>Date</p>
                    <p className='text-secodary'>{trans.date}</p>
                </div>
                <div> 
                    <p className='text-defaultBlack font-bold capitalize'>Status</p>
                    <p className='text-secodary'>{trans.status}</p>
                </div>
                <div>
                    <p className='text-defaultBlack font-bold capitalize'>Transaction Type</p>
                    <p className='text-secodary'>{trans.transType}</p>
                </div>
                <div>
                    <p className='text-defaultBlack font-bold capitalize'>Receipt</p>
                    <p className='text-secodary'>{trans.receipt}</p>
                </div>
                <div>
                    <p className='text-defaultBlack font-bold capitalize'>Amout</p>
                    <p className='text-defaultBlack font-semibold capitalize'>{trans.amount}</p>
                </div>
            </div>

            ))} */}

            <button className='bg-pry-col mt-8 px-6 py-3 rounded text-[#FFF]'>Load More</button>
        </div>
    </div>
  )
}

export default BalanceTransactionHistory