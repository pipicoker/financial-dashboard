import React, { useEffect } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { PiGameController } from 'react-icons/pi';
import { useSelector, useDispatch } from 'react-redux';
import { setExpRev, selectexpensesAndRevenue } from '../redux/revenueAndExpensesSlice';

const AllExpensesAndRevenue = () => {
  const dispatch = useDispatch();
  const expensesAndRevenue = useSelector(selectexpensesAndRevenue);

  const expensesAndRevenueRef = collection(db, "revenuesAndExpenses");

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const data = await getDocs(expensesAndRevenueRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        dispatch(setExpRev(filteredData));
      } catch (err) {
        console.error(err);
      }
    }
    getExpenses();
  }, []);

  return (
    <div className='divide-y mt-3'>
      {expensesAndRevenue.map((data) => (
        <div key={data.name} className='flex justify-between items-center py-6'>
          <div className='flex items-center space-x-3 text-left'>
            <div className='w-10 h-10 flex justify-center items-center bg-special rounded-lg'>
              <PiGameController className='w-6 h-6' />
            </div>
            <div>
              <p className='text-defaultBlack font-semibold'>{data.item}</p>
              <p className='text-gray03 text-xs'>{data.name}</p>
            </div>
          </div>
          <div>
            <p className='font-semibold text-secondary'>${data.amount}</p>
            <p className='text-xs text-gray03'>17 May 2023</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllExpensesAndRevenue;
