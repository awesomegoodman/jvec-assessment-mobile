import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditContact from '../pages/EditContact';

describe('EditContact Component', () => {
  it('renders the contact update form', () => {
    const { getByPlaceholderText, getByText } = render(<EditContact />);

    // Check if the form elements are rendered
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByText('Update Contact')).toBeTruthy();
  });

  it('validates contact update', () => {
    const { getByPlaceholderText, getByText } = render(<EditContact />);

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const updateButton = getByText('Update Contact');

    // Try to submit the form with empty fields
    fireEvent.press(updateButton);
    expect(getByText('Please fill in all fields.')).toBeTruthy();

    // Fill in the fields with valid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.press(updateButton);

    // You can add more assertions based on your actual application logic
    // For example, check if the success message is displayed
    expect(getByText('Contact updated successfully')).toBeTruthy();
  });

  it('handles contact update failure', () => {
    const { getByPlaceholderText, getByText } = render(<EditContact />);

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const updateButton = getByText('Update Contact');

    // Fill in the fields with invalid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, 'invalidphone');
    fireEvent.press(updateButton);

    // Check if the error message is displayed
    expect(getByText('Contact update failed. Please check your information.')).toBeTruthy();
  });
});
