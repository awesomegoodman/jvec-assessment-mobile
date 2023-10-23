import React, { useState } from 'react';
import { CtaButton, CtaText, ErrorText, FormContainer, InputField, SuccessText, placeholderTextColor } from '../styles/styles';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    // Basic input validation
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Check email format
    const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(emailFormat)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Check password strength (at least 8 characters)
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Create a JSON object with user registration data
    const userData = {
      username,
      email,
      password,
    };

    // Make a POST request to your Django backend
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/users/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Check the response and handle it as needed
      if (response.status === 201) {
        setError(''); // Clear previous errors
        setSuccess('User registered successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        navigation.navigate('Login' as never);
      } else {
        setSuccess('');
        setError('Registration failed. Please adjust your information.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <FormContainer>
      <CtaText testID="signup-text">Register</CtaText>
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={placeholderTextColor}
      />
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={placeholderTextColor}
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry
      />
      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}
      <CtaButton title="Register" onPress={handleSignup} testID="register-button" />
    </FormContainer>
  );
};

export default SignupForm;
