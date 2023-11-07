import React from 'react'
import { RootState } from '../redux/types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { selectGoalCategory } from '../redux/goalsByCategorySlice'
import { setActiveAdjustForm, selectActiveAdjustForm, selectCategoryTargetAmount, setCategoryTargetAmount } from '../redux/goalsFormSlice'
import {FiEdit3} from 'react-icons/fi'
import AdjustGoalsForm from './AdjustGoalsForm'
import { log } from 'console'

// const selectCategoryTargetAmount = (
//   state: RootState,
//   props: { id: string }
// ): number => {
//   const { form } = state;
//   const { categoryTargetAmounts } = form;
//   const { id } = props;

//   return categoryTargetAmounts[id] || 0;
// };
// interface GoalsByCategoryProps {
//   id: string;
//   categoryTargetAmount: number;
// }
// const GoalsByCategory: React.FC<GoalsByCategoryProps> = ({ id, categoryTargetAmount }) => {
  
const GoalsByCategory= () => {
  
 const dispatch = useDispatch()
 const categoryTargetAmount = useSelector(selectCategoryTargetAmount)
  const activeAdjustForm = useSelector(selectActiveAdjustForm)
    const goalsCategory = useSelector(selectGoalCategory)

  return (
    <div className='mt-8'>
        <h3 className='text-left text-gray02 text-[22px]' onClick={() => console.log(goalsCategory)
        }>Expenses Goals by Category</h3>

        <div className='grid grid-cols-3 gap-4 mt-4'>
          {goalsCategory && goalsCategory.map((data, index) => (
            <div key={index} className='flex items-center justify-between bg-[#FFF] rounded-lg px-6 py-7 capitalize'>

              <div className='flex space-x-4'>
                <div className='w-10 h-12 flex bg-special justify-center items-center rounded-lg'>
                  <img src={data.logo} alt="logo" className='w-6 h-6' />
                </div>

                <div className='text-left'>
                  <p className='text-gray03 font-medium'>{data.type}</p>
                  <p className='text-lg font-extrabold text-defaultBlack'>${categoryTargetAmount ? `${categoryTargetAmount}` : data.amount}.00</p>
                </div>
              </div>
              

              <button className='flex items-center px-4 py-2 rounded-[4px] border border-pry-col text-pry-col'
              onClick={()=> {
                // dispatch(setActiveAdjustForm(index))
                dispatch(setActiveAdjustForm(!activeAdjustForm))
              }}
              >Adjust <FiEdit3 className='ml-2'/></button>
            </div>
          ))}
        </div>
    </div>
  )
}


// const selectedItemId: string = id; 

// const mapStateToProps = (state: RootState, ownProps: { id: string }) => {
//   return {
//     categoryTargetAmount: selectCategoryTargetAmount(state, ownProps.id),
//   };
// };

// const id = selectedItemId.toString();
// const categoryTargetAmount = useSelector((state: RootState) =>
//   selectCategoryTargetAmount(state, { id: id })
// );

export default (GoalsByCategory);
