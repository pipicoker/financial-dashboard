import 'intersection-observer'

import { render, screen, waitFor , fireEvent} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import RecentTransactioBtns from '../components/RecentTransactioBtns';
import { selectActiveButton } from '../redux/buttonSlice';
import { setActiveButton } from '../redux/buttonSlice';

describe('recent transaction button component', () => {
    test('check if the buttons render correctly and updates the setActive button', async() => {

        const mockDispatch = jest.fn();
    jest.spyOn(store, 'dispatch').mockImplementation(mockDispatch);


        render(
            <Router>
                <Provider store={store}>
                   <RecentTransactioBtns />
                </Provider>
            </Router>
        )

        const allBtn = screen.getByRole('button', {name: /all/i})
        const revenueBtn = screen.getByRole('button', {name: /revenue/i})
        const expenseBtn = screen.getByRole('button', {name: /expenses/i})


        expect(allBtn).toBeInTheDocument()
        expect(revenueBtn).toBeInTheDocument()
        expect(expenseBtn).toBeInTheDocument()

        fireEvent.click(allBtn)
        expect(store.dispatch).toHaveBeenCalledWith(setActiveButton('all'))

        fireEvent.click(revenueBtn)
        expect(store.dispatch).toHaveBeenCalledWith(setActiveButton('revenue'))

        fireEvent.click(expenseBtn)
        expect(store.dispatch).toHaveBeenCalledWith(setActiveButton('expenses'))
         
          });
        
})