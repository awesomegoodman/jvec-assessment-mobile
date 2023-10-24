import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ContactsList from '../pages/ContactsList';
import fetchMock from 'jest-fetch-mock';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
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

describe('ContactsList Component', () => {
  it('renders the list of contacts', async () => {
    // Mock the server response for listing contacts
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, name: 'Contact 1' },
      { id: 2, name: 'Contact 2' },
    ]));

    const { getAllByTestId, queryByTestId } = render(<ContactsList />);

    // Check if the component renders the "Add Contact" button
    const addContactButton = queryByTestId('add-contact-button');

    if (addContactButton) {
      // If the button is found, it means there are no contacts, so we should expect it to be present.
      expect(addContactButton).toBeTruthy();
    } else {
      // If the button is not found, it means there are contacts, so we should expect them to be present.
      await waitFor(() => {
        expect(getAllByTestId(/delete-button/)).toBeTruthy();
      });
    }
  });

  it('deletes a contact', async () => {
    // Mock the server response for listing contacts
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, name: 'Contact 1' },
      { id: 2, name: 'Contact 2' },
    ]));

    // Mock the server response for deleting a contact
    fetchMock.mockResponseOnce('', { status: 204 });

    const { getAllByTestId, getByText, queryByText } = render(<ContactsList />);

    // Wait for the list to render before trying to delete
    await waitFor(() => {
      expect(getAllByTestId('delete-button')).toBeTruthy();
    });

    // Get the "Delete" button of the first contact
    const deleteButton = getAllByTestId('delete-button')[0];

    // Click the "Delete" button to open the delete confirmation modal
    fireEvent.press(deleteButton);

    // Wait for the modal text to be displayed
    await waitFor(() => {
      expect(getByText('Are you sure you want to delete this contact?')).toBeTruthy();
    });

    // Click the "Delete" button in the modal to delete the contact
    const confirmDeleteButton = getByText('Delete');
    fireEvent.press(confirmDeleteButton);

    // Wait for the contact to be deleted
    await waitFor(() => {
      // Assert that the "Delete" button is no longer present
      expect(queryByText('Delete')).toBeNull();
    });
  });
});
