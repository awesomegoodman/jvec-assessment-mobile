import React, { useState } from 'react';
import { CtaButton, CtaText, ErrorText, FormContainer, InputField } from '../styles/styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';

const EditContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const route = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const { contactId } = route.params;

  const handleUpdateContact = async () => {
    // Basic input validation
    if (!firstName || !lastName || !phoneNumber) {
      setError('Please fill in all fields.');
      return;
    }

    // Create a JSON object with contact data
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };

    // Make a PUT request to update the contact on Django backend
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/update/${contactId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.status === 200) {
        // Contact update successful, handle the response as needed
        setError('Contact updated successfully');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
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
      {error && <ErrorText>{error}</ErrorText>}
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
      <CtaButton title="Update Contact" onPress={handleUpdateContact} />
    </FormContainer>
  );
};

export default EditContact;