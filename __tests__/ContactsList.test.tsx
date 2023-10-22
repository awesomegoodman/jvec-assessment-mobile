import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactsList from '../pages/ContactsList';

describe('ContactsList Component', () => {
  it('renders the list of contacts', () => {
    const { getAllByText, getByText } = render(<ContactsList />);

    // Check if the component renders the "Add Contact" button
    expect(getByText('Add Contact')).toBeTruthy();

    // Check if the list of contacts is rendered
    expect(getAllByText(/Delete/)).toBeTruthy();
  });

  it('deletes a contact', () => {
    const { getAllByText, getByText } = render(<ContactsList />);

    // Get the "Delete" button of the first contact
    const deleteButton = getAllByText('Delete')[0];

    // Click the "Delete" button to open the delete confirmation modal
    fireEvent.press(deleteButton);

    // Check if the modal text is displayed
    expect(getByText('Are you sure you want to delete this contact?')).toBeTruthy();

    // Click the "Delete" button in the modal to delete the contact
    const confirmDeleteButton = getByText('Delete');
    fireEvent.press(confirmDeleteButton);

    // You should add more assertions here to check if the contact is deleted
  });

  it('navigates to CreateContact', () => {
    const { getByText } = render(<ContactsList />);

    // Click the "Add Contact" button to navigate to CreateContact
    const addContactButton = getByText('Add Contact');
    fireEvent.press(addContactButton);

    // You can add assertions to check if the navigation to CreateContact is successful
  });
});
