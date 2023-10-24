import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ContactDetails from '../pages/ContactDetails';
import { NavigationContainer } from '@react-navigation/native';

// Mock the fetch function
(global as any).fetch = jest.fn();

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

describe('ContactDetails Component', () => {
  it('renders contact details', async () => {
    // Mock the contact data
    const mockContact = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '1234567890',
    };

    // Mock the fetch function to return the contact data
    (global.fetch as any).mockResolvedValueOnce({ json: () => mockContact });

    const { getByText } = render(
      <NavigationContainer>
        <ContactDetails />
      </NavigationContainer>
    );

    // Ensure "Loading contact details..." text is displayed
    expect(getByText('Loading contact details...')).toBeTruthy();

    await waitFor(async () => {
      // Ensure the contact details are displayed
      const contactNameText = `${mockContact.first_name} ${mockContact.last_name}`;
      const phoneNumberText = `${mockContact.phone_number}`;

      expect(getByText(contactNameText)).toBeTruthy();
      expect(getByText(phoneNumberText)).toBeTruthy();
    });
  });

  it('handles contact deletion', async () => {
    // Mock the contact data
    const mockContact = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '1234567890',
    };

    // Mock the fetch function to return the contact data
    (global.fetch as any).mockResolvedValueOnce({ json: () => mockContact });

    // Mock the fetch function for the delete request
    (global.fetch as any).mockResolvedValueOnce({ status: 204 });

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <ContactDetails />
      </NavigationContainer>
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(getByText(`${mockContact.first_name} ${mockContact.last_name}`)).toBeTruthy();
    });

    // Click the delete button
    fireEvent.press(getByTestId('delete-contact-button'));

    // Wait for the delete confirmation modal to appear
    await waitFor(() => {
      expect(getByText('Are you sure you want to delete this contact?')).toBeTruthy();
    });

    // Click the "Delete" button in the modal
    fireEvent.press(getByText('Delete'));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(getByText('Contact deleted successfully')).toBeTruthy();
    });
  });
});
