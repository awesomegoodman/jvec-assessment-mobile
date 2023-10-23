import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ContactsList from '../pages/ContactsList';
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

describe('ContactsList Component', () => {
  it('renders the list of contacts', async () => {
    // Mock the server response for listing contacts
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, name: 'Contact 1' },
      { id: 2, name: 'Contact 2' },
    ]));

    const { getAllByText, getByText } = render(<ContactsList />);

    // Check if the component renders the "Add Contact" button
    expect(getByText('Add Contact')).toBeTruthy();

    // Wait for the list of contacts to be rendered
    await waitFor(() => {
      expect(getAllByText(/Delete/)).toBeTruthy();
    });
  });

  it('deletes a contact', async () => {
    // Mock the server response for listing contacts
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, name: 'Contact 1' },
      { id: 2, name: 'Contact 2' },
    ]));

    // Mock the server response for deleting a contact
    fetchMock.mockResponseOnce('', { status: 204 });

    const { getAllByText, getByText, queryByText } = render(<ContactsList />);

    // Get the "Delete" button of the first contact
    const deleteButton = getAllByText('Delete')[0];

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

  it('navigates to CreateContact', () => {
    const { getByText } = render(<ContactsList />);

    // Click the "Add Contact" button to navigate to CreateContact
    const addContactButton = getByText('Add Contact');
    fireEvent.press(addContactButton);

    // You can add assertions to check if the navigation to CreateContact is successful
    // For example, you can check if the navigation action has been called with the expected route.
  });
});
