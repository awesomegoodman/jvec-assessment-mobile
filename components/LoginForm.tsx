import React, { useState } from 'react';
import { CtaButtonText, CtaText, ErrorText, FormContainer, InputField, SuccessText, TouchableCta, placeholderTextColor } from '../styles/styles';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screenNames } from '../constants/screenNames';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Basic input validation
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Create a JSON object with user login data
    const userData = {
      username,
      password,
    };

    // Make a POST request to your Django backend
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        // Login successful, handle the response as needed

        const data = await response.json(); // Parse the response JSON

        // Extract the token from the response data
        const token = data.token;
        const user_id = data.user_id;

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userId', String(user_id));

        setError(''); // Clear any previous error
        setSuccess('Login successful');
        setUsername('');
        setPassword('');
        navigation.navigate(screenNames.Contacts as never);
        setSuccess('');
      } else {
        // Handle login failure, e.g., incorrect username or password
        setError('Login failed. Please check your information.');
        setSuccess(''); // Clear any previous success message
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <FormContainer>
      <CtaText testID="login-text">Login</CtaText>
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={placeholderTextColor}
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={placeholderTextColor}
      />
      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}
      <TouchableCta onPress={handleLogin} testID="login-button">
        <CtaButtonText>Login</CtaButtonText>
      </TouchableCta>
    </FormContainer>
  );
};

export default LoginForm;
