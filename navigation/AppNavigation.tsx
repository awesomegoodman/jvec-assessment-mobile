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
import AddButton from '../components/AddContactButton';
enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);
  console.log(loggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loggedIn ? 'Contacts' : 'Home'}>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Register" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Add contact" component={CreateContact} />
        <Stack.Screen name="Edit contact" component={EditContact} />
        <Stack.Screen
          name="Contacts"
          component={ContactsList}
          options={{
            headerRight: AddButton,
          }}
        />
        <Stack.Screen name="Contact details" component={ContactDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
