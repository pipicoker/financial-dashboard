import 'intersection-observer'

import { render, screen, waitFor , fireEvent} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import RecentTransactions from '../components/RecentTransactions';

describe('RecentTransactions', () => {

    test('renders recent transactions correctly', async() => {
        render (
            <Router>
                <Provider store={store}>
                    <RecentTransactions />
                </Provider>
            </Router>
        )

        expect(screen.getByText(/recent transactions/i)).toBeInTheDocument()

        // query the view all button
        const viewAllBtn = screen.getByText(/view all/i)

        //simulate clicking the view all button
        fireEvent.click(viewAllBtn)

        expect(viewAllBtn).toBeInTheDocument()
        expect(window.location.pathname).toBe('/Home/Transactions')
    })
})