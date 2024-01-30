import 'intersection-observer'

import { render, screen, } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AllExpensesAndRevenue from '../components/AllExpensesAndRevenue';

const mockStore = configureStore();

describe('AllExpensesAndRevenue', () => {
    
    
    test('renders component with expenses data when activeButton is expenses', async() => {
        const mockExpenses = [
            {name: 'polo shirt', amount: 10, item:'xl fashions'}
        ]
        const store = mockStore({
            transactions: {
              expenses: mockExpenses,
              revenues: [],
            },
            button: {
              activeButton: 'expenses',
            },
          });
        render(
            <Router>
                <Provider store={store}>
                   <AllExpensesAndRevenue />
                </Provider>
            </Router>
        )

        expect(screen.getByText(/polo shirt/i)).toBeInTheDocument()
    } )

    test('renders component with revenue data when activeButton is "revenue"', () => {
        const mockRevenues = [
            {name: 'Lucky', amount: 500, item:'Abuchi Lucky'}
        ]

        const store = mockStore({
            transactions: {
              expenses: [],
              revenues: mockRevenues,
            },
            button: {
              activeButton: 'revenue',
            },
          });
        render(
            <Router>
                <Provider store={store}>
                   <AllExpensesAndRevenue />
                </Provider>
            </Router>
        )

        expect(screen.getByText(/abuchi lucky/i)).toBeInTheDocument()
    })

    test('renders component with all data when activeButton is "all"', () => {
        const mockExpenses = [
            {name: 'polo shirt', amount: 10, item:'xl fashions'}
        ]

        const mockRevenues = [
            {name: 'Lucky', amount: 500, item:'Abuchi Lucky'}
        ]

        const store = mockStore({
            transactions: {
              expenses: mockExpenses,
              revenues: mockRevenues,
            },
            button: {
              activeButton: 'all',
            },
          });
          render(
            <Router>
                <Provider store={store}>
                   <AllExpensesAndRevenue />
                </Provider>
            </Router>
        )
          expect(screen.getByText(/abuchi lucky/i)).toBeInTheDocument()
          expect(screen.getByText(/polo shirt/i)).toBeInTheDocument()
    })
})