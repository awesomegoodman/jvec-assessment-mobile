import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Homepage from '../pages/Homepage';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import CreateContact from '../pages/CreateContact';
import EditContact from '../pages/EditContact';
import ContactsList from '../pages/ContactsList';
import ContactDetails from '../pages/ContactDetails';
import { enableScreens } from 'react-native-screens';
import { RootStackParamList } from '../constants/types';
import { screenNames } from '../constants/screenNames';
import RightButtons from '../components/RightButtons';
enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

  const [loggedIn, setLoggedIn] = useState<boolean | null | undefined>(null);

  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (loggedIn === null || undefined) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loggedIn ? screenNames.Contacts : screenNames.Home}>
        <Stack.Screen
          name={screenNames.Home}
          options={{
            headerTitleAlign: 'center',
          }}
          component={Homepage}
        />
        <Stack.Screen
          name={screenNames.Register}
          component={Signup}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name={screenNames.Login}
          component={Login}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen name={screenNames.AddContact} component={CreateContact} />
        <Stack.Screen name={screenNames.EditContact} component={EditContact} />
        <Stack.Screen
          name={screenNames.Contacts}
          component={ContactsList}
          options={{
            headerRight: RightButtons,
            headerLeft: () => loggedIn ? null : undefined,
          }}
        />
        <Stack.Screen name={screenNames.ContactDetails} component={ContactDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
