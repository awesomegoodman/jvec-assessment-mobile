import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateContact from '../pages/CreateContact';

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

describe('CreateContact Component', () => {
  it('renders the contact creation form', () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId } = render(<CreateContact />);

    // Check if the form elements are rendered
    expect(getByPlaceholderText('First name')).toBeTruthy();
    expect(getByPlaceholderText('Last name')).toBeTruthy();
    expect(getByPlaceholderText('Phone number')).toBeTruthy();
    expect(getByTestId('create-contact-text')).toBeTruthy();
  });

  it('validates contact creation - failure', async () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, findByText, queryByText, getByTestId } = render(<CreateContact />);

    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');
    const phoneNumberInput = getByPlaceholderText('Phone number');
    const createButton = getByTestId('create-contact');

    // Try to submit the form with empty fields
    fireEvent.press(createButton);
    expect(queryByText('Please fill in all fields.')).toBeTruthy();

    // Mock an unsuccessful contact creation response
    fetchMock.mockResponseOnce(JSON.stringify({
      detail: 'Contact creation failed. Please check your information.',
    }), {
      status: 400, // Simulating a bad request status
      headers: { 'Content-Type': 'application/json' },
    });

    // Fill in the fields with invalid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, 'invalidphone');
    fireEvent.press(createButton);

    const error = await findByText('Contact creation failed. Please check your information.');
    expect(error).toBeTruthy();
  });

  it('validates contact creation - success', async () => {
    useNavigation(); // Adding useNavigation here to resolve the warning
    const { getByPlaceholderText, getByTestId, findByText } = render(<CreateContact />);

    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');
    const phoneNumberInput = getByPlaceholderText('Phone number');
    const createButton = getByTestId('create-contact-text');

    // Mock a successful contact creation response
    fetchMock.mockResponseOnce(JSON.stringify({
      message: 'Contact created successfully',
    }), {
      status: 201, // Simulating a successful contact creation status
      headers: { 'Content-Type': 'application/json' },
    });

    // Fill in the fields with valid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, '12345678900');
    fireEvent.press(createButton);

    // Wait for the success message to appear
    const successMessage = await findByText('Contact created successfully');

    expect(successMessage).toBeTruthy();
  });
});
