import 'intersection-observer'
import { render, screen, waitFor , fireEvent} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import UpcomingBill from '../components/UpcomingBill';
import { setUpcoming } from '../redux/upcomingBillSlice';

import store from '../redux/store';

describe('UpcomingBill component', () => {

  test('renders upcoming bills correctly', async () => {

    const data = [ {
      billDate: 'Jun 16',
      company: 'Adobe',
      duration: 'Yearly',
      lastCharge: '17 Jun, 2024',
      pix: 'string',
      description: 'for advanced',
      price: 559
    } ]

    store.dispatch(setUpcoming(data));

    render(
      <Router>
        <Provider store={store}>
          <UpcomingBill />
        </Provider>
      </Router>
    );

    // Check if the "Upcoming Bill" heading is rendered
    expect(screen.getByText('Upcoming Bill')).toBeInTheDocument();

    // Check if each upcoming item is rendered
    data.forEach((item) => {
      const companyName = screen.getByText(`${item.company} - ${item.duration}`)
      const lastCharge = screen.getByText(`Last charge - ${item.lastCharge}`);
      const price = screen.getByText(`$${item.price}`)

      expect(companyName).toBeInTheDocument()
      expect(lastCharge).toBeInTheDocument()
      expect(price).toBeInTheDocument()
    })

    
  });

  test('redirects to the correct link when "View All button" is clicked', () => {
    render (
      <Router>
        <Provider store={store}>
          <UpcomingBill />
        </Provider>
      </Router>
    )

    const ViewAllButton = screen.getByText(/view all/i)

    // check if view all button is rendered
    expect(ViewAllButton).toBeInTheDocument()

    //stimulate a click on the "view all button"
    fireEvent.click(ViewAllButton)

    // Check if the URL has changed to /Home/Bills
    expect(window.location.pathname).toBe('/Home/Bills')


  })
  
});
