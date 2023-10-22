import React from 'react';
import LoginForm from '../components/LoginForm';
import { fireEvent, render } from '@testing-library/react-native';

describe('LoginForm Component', () => {
    it('renders the form elements', () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm />);

        // Check if the form elements are rendered
        expect(getByPlaceholderText('Username')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Login')).toBeTruthy();
    });

    it('validates user login', () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm />);

        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Login');

        // Try to submit the form with empty fields
        fireEvent.press(loginButton);
        expect(getByText('Please fill in all fields.')).toBeTruthy();

        // Fill in the fields with valid data and submit
        fireEvent.changeText(usernameInput, 'validuser');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(loginButton);

        // You can add more assertions based on your actual application logic
        // For example, check if the success message is displayed
        expect(getByText('Login successful')).toBeTruthy();
    });

    it('handles login failure', () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm />);

        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Login');

        // Fill in the fields with invalid data and submit
        fireEvent.changeText(usernameInput, 'invaliduser');
        fireEvent.changeText(passwordInput, 'incorrectpassword');
        fireEvent.press(loginButton);

        // Check if the error message is displayed
        expect(getByText('Login failed. Please check your information.')).toBeTruthy();
    });
});
