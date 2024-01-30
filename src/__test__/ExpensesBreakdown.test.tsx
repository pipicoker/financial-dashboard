import 'intersection-observer'
import { render, screen} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';
import ExpensesBreakdown from '../components/ExpensesBreakdown';
import { setExpenseBreakdown } from '../redux/expensesSlices';

describe('expensesBreakdown', () => {
    test('to ensure that the component is rendering correctly', () => {
       const data = [{
            percentage: 15,
      total: 250,
      color: "red",
      type: "housing",
      logo: "http",
      breakdown :[{
        amount: 20,
        name: "parking",
        date: "24 may 2023"
      }]
        }]

        store.dispatch(setExpenseBreakdown(data))

        render(
            <Router>
                <Provider store={store}>
                   <ExpensesBreakdown />
                </Provider>
            </Router>
        )
        
        expect(screen.getByText(/expenses breakdow/i)).toBeInTheDocument()
        expect(screen.getByText(/compare to last week/i)).toBeInTheDocument()

        data.forEach((item) => {
            const itemName = screen.getByText(`${item.type}`)
            const itemPrice = screen.getByText(`$${item.total}.00`)
            const itemPercentage = screen.getByText(`${item.percentage}%`)

            expect(itemName).toBeInTheDocument()
            expect(itemPrice).toBeInTheDocument()
            expect(itemPercentage).toBeInTheDocument()
        })
    })
})