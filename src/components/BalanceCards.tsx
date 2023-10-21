import React from 'react'
import { useSelector } from 'react-redux';
import {selectCardList} from '../redux/balancesSlice'

import { MdOutlineNavigateNext } from 'react-icons/md';


const BalanceCards = () => {
    const cardList = useSelector(selectCardList)

  return (
    <div>
        <h3 className='text-left text-gray02 text-[22px]'>Balances</h3>

        <div className='grid grid-cols-3 gap-6 mt-4'>
            {cardList.map((card: any, id:number) => (
                <div key={id} className='w-[352px] h-72 p-6 bg-[#FFF] divide-y'>

                    <div className='flex justify-between items-center pb-4 '>
                        <p className='font-bold text-gray02'> {card.accountType}</p>
                        <p className='font-medium text-xs text-gray01'>{card.cardType}</p>
                    </div>

                    <div className='pt-4 text-left'>
                    <div>
                        <p className='font-semibold text-xl text-defaultBlack'>{card.accountNumber.toString().replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$4 $4 $4 **** ")}</p>
                        <p className='text-sm text-gray03'>Account Number</p>
                    </div>

                    <div className='mt-4'>
                        <p className='font-semibold text-xl text-defaultBlack'>${card.accountBalance}</p>
                        <p className='text-sm text-gray03'>Toatal amount</p>
                    </div>

                    <div className='mt-[30px] flex justify-between items-center'>
                        <p className='text-pry-col'>Remove</p>

                        <button className='flex items-center gap-2 justify-center bg-pry-col text-white text-sm font-medium rounded-[4px] px-5 py-2'>Details <span ><MdOutlineNavigateNext className='text-white'/></span> </button>
                    </div>
                    </div>

                    
                    
                </div>
            ))}
            <div className='w-[352px] h-72 bg-[#FFF] flex flex-col justify-center items-center gap-4'>
                <button className='bg-pry-col px-8 py-3 font-bold  text-[#FFF] rounded-[4px]'>Add Accounts</button>
                <button className='text-gray03 font-medium'>Edit Accounts</button>
            </div>
        </div>
        
    </div>
  )
}

export default BalanceCards