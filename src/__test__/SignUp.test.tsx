import 'intersection-observer'

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import user from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SignUp from '../components/SignUp';
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
        <SignUp />
      </MemoryRouter>
    </Provider>
  );

  screen.logTestingPlaygroundURL()

  // find an element in it
  const textField = screen.getAllByRole('textbox');
  const passwordField = screen.getByPlaceholderText('..............')
  const buttons = screen.getAllByRole('button');
  const createAccount = screen.getByText(/Already have an account/i);

  // Assertion - make sure the component is doing what it is supposed to do
  expect(textField).toHaveLength(2);
  expect(passwordField).toBeInTheDocument;
  expect(buttons).toHaveLength(2);
  expect(createAccount).toBeInTheDocument();
});


