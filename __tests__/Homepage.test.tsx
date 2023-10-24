import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Homepage from '../pages/Homepage';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../constants/screenNames';

// Mock the useNavigation function
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Homepage Component', () => {
  it('renders the homepage with buttons', () => {
    const { getByText } = render(<Homepage />);

    // Check if the description text is rendered
    expect(getByText('Manage your contacts on the fly!')).toBeTruthy();

    // Check if the "Register" and "Login" buttons are rendered
    expect(getByText(screenNames.Register)).toBeTruthy();
    expect(getByText(screenNames.Login)).toBeTruthy();
  });

  it('navigates to Register and Login screens', async () => {
    const { getByTestId } = render(<Homepage />);
    console.log(useNavigation().navigate);

    // Click the "Register" button and wait for the navigation to complete
    fireEvent.press(getByTestId('register-button'));

    await waitFor(() => {
      expect(useNavigation().navigate).toHaveBeenCalledWith(screenNames.Register as never);
    });

    // Click the "Login" button and wait for the navigation to complete
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      expect(useNavigation().navigate).toHaveBeenCalledWith(screenNames.Login as never);
    });
  });
});
