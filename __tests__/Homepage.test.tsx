import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Homepage from '../pages/Homepage';
import { useNavigation } from '@react-navigation/native';

// Mock the useNavigation function
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('Homepage Component', () => {
  it('renders the homepage with buttons', () => {
    const { getByText } = render(<Homepage />);

    // Check if the description text is rendered
    expect(getByText('Manage your contacts on the fly!')).toBeTruthy();

    // Check if the "Signup" and "Login" buttons are rendered
    expect(getByText('Signup')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('navigates to Signup and Login screens', () => {
    const { getByText } = render(<Homepage />);

    // Click the "Signup" button and check if it navigates to the correct screen
    fireEvent.press(getByText('Signup'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('Register' as never);

    // Click the "Login" button and check if it navigates to the correct screen
    fireEvent.press(getByText('Login'));
    expect(useNavigation().navigate).toHaveBeenCalledWith('Login' as never);
  });
});
