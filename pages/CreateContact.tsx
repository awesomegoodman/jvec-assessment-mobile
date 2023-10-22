import React, { useState } from 'react';
import { CtaButton, CtaText, ErrorText, FormContainer, InputField } from '../styles/styles';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';

const CreateContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleCreateContact = async () => {
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

    // Make a POST request to create the contact on Django backend
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.status === 201) {
        // Contact creation successful, handle the response as needed
        setError('Contact created successfully');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
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
      <CtaButton title="Create Contact" onPress={handleCreateContact} />
    </FormContainer>
  );
};

export default CreateContact;
