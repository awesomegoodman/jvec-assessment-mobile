import React, { useState } from 'react';
import { CtaButtonText, CtaText, ErrorText, FormContainer, InputField, SuccessText, TouchableCta } from '../styles/styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { BACKEND_ROOT_DOMAIN, getHeaders } from '../constants/constants';
import { screenNames } from '../constants/screenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditContact = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const { contact: contactObj } = route.params;
  const contactId = contactObj.id;
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(contactObj.first_name);
  const [lastName, setLastName] = useState(contactObj.last_name);
  const [phoneNumber, setPhoneNumber] = useState(contactObj.phone_number);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdateContact = async () => {
    // Basic input validation
    if (!firstName || !lastName || !phoneNumber) {
      setError('Please fill in all fields.');
      return;
    }

    const userId = await AsyncStorage.getItem('userId');

    // Create a JSON object with contact data
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      user: userId,
    };

    const headers = await getHeaders();

    // Make a PUT request to update the contact on Django backend
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/update/${contactId}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(contactData),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        // Contact update successful, handle the response as needed
        setSuccess('Contact updated successfully');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        navigation.navigate(screenNames.Contacts as never);
      } else {
        // Handle contact update failure
        setError('Contact update failed. Please check your information.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <FormContainer>
      <CtaText>Edit Contact</CtaText>
      <InputField
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <InputField
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <InputField
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {error && <ErrorText>{error}</ErrorText>}
      {success && <SuccessText>{success}</SuccessText>}

      <TouchableCta onPress={handleUpdateContact}>
        <CtaButtonText>Update</CtaButtonText>
      </TouchableCta>
    </FormContainer>
  );
};

export default EditContact;