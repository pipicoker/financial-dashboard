
import RecentTransactioBtns from '../components/RecentTransactioBtns'
import RecentTransactionFullTable from '../components/RecentTransactionFullTable'



const RecentTransactionPage = () => {


  return (
    <div 
    
    className='pt-4 w-full'>
         <h3 className='text-left text-gray02 text-[22px] mb-4'>Recent Transaction</h3>
         <RecentTransactioBtns />
         <RecentTransactionFullTable />
         
    </div>
  )
}

export default RecentTransactionPage