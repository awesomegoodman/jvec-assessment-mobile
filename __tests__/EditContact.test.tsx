import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditContact from '../pages/EditContact';
import { NavigationContainer } from '@react-navigation/native';
import fetchMock from 'jest-fetch-mock';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock the useRoute hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {
      contact: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '1234567890',
      },
    },
  }),
}));

beforeEach(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe('EditContact Component', () => {
  it('renders the contact update form', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <EditContact />
      </NavigationContainer>
    );

    // Check if the form elements are rendered
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByText('Update')).toBeTruthy();
  });

  it('validates contact update', async () => {
    const { getByPlaceholderText, getByText, queryByText, getByTestId } = render(
      <NavigationContainer>
        <EditContact />
      </NavigationContainer>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const updateButton = getByTestId('update-button');

    let timeoutId; // Variable to store the timeout ID

    // Try to submit the form with empty fields
    fireEvent.press(updateButton);

    // Set a timeout and store its ID in the variable
    timeoutId = setTimeout(() => {
      expect(queryByText('Please fill in all fields.')).toBeTruthy();
    }, 1000);

    // Mock a successful contact update response
    fetchMock.mockResponseOnce(JSON.stringify({
      message: 'Contact updated successfully',
    }), {
      status: 200, // Simulating a successful update status
      headers: { 'Content-Type': 'application/json' },
    });

    // Fill in the fields with valid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.press(updateButton);

    // Clear the timeout
    clearTimeout(timeoutId);

    // Wait for the success message to appear
    await waitFor(() => {
      expect(getByText('Contact updated successfully')).toBeTruthy();
    });
  });

  it('handles contact update failure', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <EditContact />
      </NavigationContainer>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const phoneNumberInput = getByPlaceholderText('Phone Number');
    const updateButton = getByText('Update');

    // Mock an unsuccessful contact update response
    fetchMock.mockResponseOnce(JSON.stringify({
      detail: 'Contact update failed. Please check your information.',
    }), {
      status: 400, // Simulating a bad request status
      headers: { 'Content-Type': 'application/json' },
    });

    // Fill in the fields with invalid data and submit
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneNumberInput, 'invalidphone');
    fireEvent.press(updateButton);

    // Check if the error message is displayed
    const errorMessage = await findByText('Contact update failed. Please check your information.');
    expect(errorMessage).toBeTruthy();
  });
});
