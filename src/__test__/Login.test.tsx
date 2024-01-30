import 'intersection-observer'

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Login from '../components/Login';

// Mock Firebase modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

test('it shows 3 inputs and 2 buttons and create account link', () => {
  // render the component with the Redux Provider
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  screen.logTestingPlaygroundURL()

  // find an element in it
  const emailField = screen.getAllByRole('textbox');
  const passwordField = screen.getByPlaceholderText('..............')
  const checkbox = screen.getByRole('checkbox');
  const buttons = screen.getAllByRole('button');
  const createAccount = screen.getByText(/create an account/i);

  // Assertion - make sure the component is doing what it is supposed to do
  expect(emailField).toHaveLength(1);
  expect(passwordField).toBeInTheDocument;
  expect(emailField).toHaveLength(1);
  expect(checkbox).toBeInTheDocument();
  expect(buttons).toHaveLength(2);
  expect(createAccount).toBeInTheDocument();
});


