import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SignupForm from '../components/SignupForm';

describe('SignupForm Component', () => {
    it('renders the form elements', () => {
      const { getByPlaceholderText, getByText } = render(<SignupForm />);

      // Check if the form elements are rendered
      expect(getByPlaceholderText('Username')).toBeTruthy();
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Password')).toBeTruthy();
      expect(getByText('Register')).toBeTruthy();
    });

    it('validates user registration', () => {
        const { getByPlaceholderText, getByText } = render(<SignupForm />);

        const usernameInput = getByPlaceholderText('Username');
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const registerButton = getByText('Register');

        // Try to submit the form with empty fields
        fireEvent.press(registerButton);
        expect(getByText('Please fill in all fields.')).toBeTruthy();

        // Fill in the fields with invalid data and submit
        fireEvent.changeText(usernameInput, 'user123');
        fireEvent.changeText(emailInput, 'invalidemail');
        fireEvent.changeText(passwordInput, '123');
        fireEvent.press(registerButton);

        expect(getByText('Please enter a valid email address.')).toBeTruthy();
        expect(getByText('Password must be at least 8 characters long.')).toBeTruthy();

        // Fill in the fields with valid data and submit
        fireEvent.changeText(usernameInput, 'validuser');
        fireEvent.changeText(emailInput, 'user@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(registerButton);

        // You can add more assertions based on your actual application logic
        // For example, check if the success message is displayed
        expect(getByText('User registered successfully')).toBeTruthy();
    });
});
