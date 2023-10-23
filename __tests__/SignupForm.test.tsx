import React from 'react';
import SignupForm from '../components/SignupForm';
import { fireEvent, render } from '@testing-library/react-native';

import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

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

    // Fill in the fields with valid data and submit
    fireEvent.changeText(usernameInput, 'validuser3');
    fireEvent.changeText(emailInput, 'user3@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(registerButton);

    // Wait for the success message to appear
    const successMessage = await findByText('User registered successfully');

    expect(successMessage).toBeTruthy();
  });
});
