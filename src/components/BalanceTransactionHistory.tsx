import React from 'react'
import { accountDetailsSlice, selectAccountDetails } from '../redux/accountDetailsSlice';
import { useSelector } from 'react-redux';

const BalanceTransactionHistory = () => {
    const accountDetails = useSelector(selectAccountDetails)
    const transactionHistory = accountDetails.transactionHistory
  return (
    <div className='mt-8 w-full'>
         <h3 className='text-left text-gray02 text-[22px]' onClick={() => console.log(accountDetailsSlice)}>Transaction History</h3>

         <div className=' mt-5 rounded-2xl bg-[#FFF] px-8 pt-3 lg:pt-1 pb-8 overflow-x-scroll '>
            <table className='w-[420px] lg:w-full  divide-y '>
                <thead>
                    <tr className='text-defaultBlack   font-bold capitalize'>
                        <th className='pt-2 pb-4 text-left'>Date</th>
                        <th className='pt-2 pb-4 hidden lg:flex'>Status</th>
                        <th className='pt-2 pb-4'>Trasaction</th>
                        <th className='pt-2 pb-4'>Receipt</th>
                        <th className='pt-2 pb-4'>Amount</th>
                        
                    </tr>
                </thead>
                
                <tbody className='divide-y'>
                    {transactionHistory.map((tras, id) => (
                        <tr key={id} className='text-secondary '>
                            <td className='pt-4 pb-4 text-left'>{tras.date}</td>
                            <td className='pt-4 pb-4 hidden lg:flex'>{tras.status}</td>
                            <td className='pt-4 pb-4'>{tras.transType}</td>
                            <td className='pt-4 pb-4'>{tras.receipt}</td>
                            <td className='pt-4 pb-4 font-semibold text-defaultBlack'>${tras.amount}</td>
                        </tr>
                    ))}
                    {transactionHistory.map((tras, id) => (
                        <tr key={id} className='text-secondary'>
                            <td className='pt-4 pb-4 text-left'>{tras.date}</td>
                            <td className='pt-4 pb-4 hidden lg:flex'>{tras.status}</td>
                            <td className='pt-4 pb-4'>{tras.transType}</td>
                            <td className='pt-4 pb-4'>{tras.receipt}</td>
                            <td className='pt-4 pb-4 font-semibold text-defaultBlack'>${tras.amount}</td>
                        </tr>
                    ))}
                </tbody>
                
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