import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateContact from '../pages/CreateContact';

describe('CreateContact Component', () => {
  it('renders the contact creation form', () => {
    const { getByPlaceholderText, getByText } = render(<CreateContact />);

    // Check if the form elements are rendered
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByText('Create Contact')).toBeTruthy();
  });

  it('validates contact creation', () => {
    const { getByPlaceholderText, getByText } = render(<CreateContact />);

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const createButton = getByText('Create Contact');

    // Try to submit the form with empty fields
    fireEvent.press(createButton);
    expect(getByText('Please fill in all fields.')).toBeTruthy();

    // Fill in the fields with valid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.press(createButton);

    // You can add more assertions based on your actual application logic
    // For example, check if the success message is displayed
    expect(getByText('Contact created successfully')).toBeTruthy();
  });

  it('handles contact creation failure', () => {
    const { getByPlaceholderText, getByText } = render(<CreateContact />);

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const createButton = getByText('Create Contact');

    // Fill in the fields with invalid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, 'invalidphone');
    fireEvent.press(createButton);

    // Check if the error message is displayed
    expect(getByText('Contact creation failed. Please check your information.')).toBeTruthy();
  });
});
