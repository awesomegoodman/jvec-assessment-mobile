import React from 'react';
import LoginForm from '../components/LoginForm';
import { fireEvent, render } from '@testing-library/react-native';

import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('LoginForm Component', () => {
  it('renders the form elements', () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId } = render(<LoginForm />);

    // Check if the form elements are rendered
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByTestId('login-text')).toBeTruthy();
  });

  it('validates user login', async () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId, queryByText, findByText } = render(<LoginForm />);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByTestId('login-button');

    // Try to submit the form with empty fields
    fireEvent.press(loginButton);
    expect(queryByText('Please fill in all fields.')).toBeTruthy();

    // Fill in the fields with valid data and submit
    fireEvent.changeText(usernameInput, 'awestars@gmail.com');
    fireEvent.changeText(passwordInput, 'awestars@gmail.com');
    fireEvent.press(loginButton);

    // Wait for the success message to appear
    const successMessage = await findByText('Login successful');

    expect(successMessage).toBeTruthy();
  });

  it('handles login failure', async () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId, findByText } = render(<LoginForm />);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByTestId('login-button');

    // Fill in the fields with invalid data and submit
    fireEvent.changeText(usernameInput, 'invaliduser');
    fireEvent.changeText(passwordInput, 'incorrectpassword');
    fireEvent.press(loginButton);

    // Wait for the error message to appear
    const errorMessage = await findByText('Login failed. Please check your information.');

    // Assert that the error message is present
    expect(errorMessage).toBeTruthy();
  });
});
