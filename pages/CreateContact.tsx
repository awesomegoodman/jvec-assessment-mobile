import React, { useState } from 'react';
import { CtaButton, CtaText, ErrorText, FormContainer, InputField, SuccessText, placeholderTextColor } from '../styles/styles';
import { BACKEND_ROOT_DOMAIN, getHeaders } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CreateContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();

  const handleCreateContact = async () => {
    // Basic input validation
    if (!firstName || !lastName || !phoneNumber) {
      setError('Please fill in all fields.');
      return;
    }

    // Get userId
    const userId = await AsyncStorage.getItem('userId');

    // Create a JSON object with contact data
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      user: userId,
    };

    const headers = await getHeaders();

    // Make a POST request to create the contact on Django backend
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/create/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(contactData),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 201) {
        // Contact creation successful, handle the response as needed
        setSuccess('Contact created successfully');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        navigation.navigate('Contacts' as never);
      } else {
        // Handle contact creation failure
        setError('Contact creation failed. Please check your information.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <FormContainer>
      <CtaText>Create Contact</CtaText>

      <InputField
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor={placeholderTextColor}
      />
      <InputField
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor={placeholderTextColor}
      />
      <InputField
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholderTextColor={placeholderTextColor}
      />

      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}

      <CtaButton title="Create Contact" onPress={handleCreateContact} />
    </FormContainer>
  );
};

export default CreateContact;
