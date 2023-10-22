import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

export function useNavigation() {
  return {
    navigate: jest.fn(),
  };
}

export const Route = ({ children }: { children: React.ReactNode }) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
