import React from 'react';
import SignupForm from '../components/RegisterForm';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { useNavigation } from '@react-navigation/native';
import fetchMock from 'jest-fetch-mock';


jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

beforeEach(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe('SignupForm Component', () => {
  it('renders the form elements', () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId } = render(<SignupForm />);

    // Check if the form elements are rendered
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByTestId('register-button')).toBeTruthy();
  });

  it('validates user registration - failure', async () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId, findByText, queryByText } = render(<SignupForm />);

    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByTestId('register-button');

    // Try to submit the form with empty fields
    fireEvent.press(registerButton);
    expect(queryByText('Please fill in all fields.')).toBeTruthy();

    // Mock an unsuccessful registration response
    fetchMock.mockResponseOnce(JSON.stringify({
      detail: 'Registration failed. Please adjust your information.',
    }), {
      status: 400, // Simulating a bad request status
      headers: { 'Content-Type': 'application/json' },
    });

    // Fill in the fields with invalid data and submit
    fireEvent.changeText(usernameInput, 'user123');
    fireEvent.changeText(emailInput, 'invalidemail');
    fireEvent.changeText(passwordInput, '123');
    fireEvent.press(registerButton);

    const error = await findByText('Please enter a valid email address.' || 'Password must be at least 8 characters long.');
    expect(error).toBeTruthy();
  });

  it('validates user registration - success', async () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId, findByText } = render(<SignupForm />);

    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByTestId('register-button');

    // Mock a successful registration response
    fetchMock.mockResponseOnce(JSON.stringify({
      message: 'User registered successfully',
    }), {
      status: 201, // Simulating a successful registration status
      headers: { 'Content-Type': 'application/json' },
    });

    // Fill in the fields with valid data and submit
    fireEvent.changeText(usernameInput, 'validuser3');
    fireEvent.changeText(emailInput, 'user3@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(registerButton);

    // Wait for the success message to appear using waitFor
    await waitFor(() => {
      const successMessage = findByText('User registered successfully');
      expect(successMessage).toBeTruthy();
    });

  });
});
