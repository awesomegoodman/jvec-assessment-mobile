import React, { useState, useEffect } from 'react';
import { Contact, RootStackParamList } from '../constants/types';
import {
  ComponentContainer,
  ContactNameText,
  CtaButtonText,
  ErrorText,
  ModalContainer,
  ModalText,
  PhoneNumberText,
  SuccessText,
  TouchableCta,
} from '../styles/styles';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, Modal } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';


const ContactInfo = styled.View`
  font-size: 18px;
  color: #333;
`;

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;


const ContactDetails = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'ContactDetails'>>();
  const { contact: contactObj } = route.params;
  const contactId = contactObj?.id;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch the contact details from Django backend based on the contact ID
    fetch(`${BACKEND_ROOT_DOMAIN}/contacts/detail/${contactId}/`)
      .then((response) => response.json())
      .then((data) => setContact(data))
      .catch((error) => console.error('Error:', error));
  }, [contactId]);

  const handleEditContact = () => {
    // Navigate to the EditContact page with the contactId as a parameter
    navigation.navigate('Edit contact', { contact: contact });
  };

  const handleDeleteContact = () => {
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/delete/${contactId}/`, {
        method: 'DELETE',
      });
      console.log(response);
      if (response.status === 204 || response.status === 200 || response.ok) {
        // Contact deleted successfully
        navigation.navigate('Contacts' as never);
        setError('');
        setSuccess('Contact deleted successfully');
      } else {
        console.error('Failed to delete contact');
        setSuccess('');
        // setError('Failed to delete contact');
      }
    } catch (err) {
      console.error('Error:', err);
    }

    setDeleteModalVisible(false);
  };

  return (
    <ComponentContainer>
      {contact ? (
        <ContactInfo>
          <ContactNameText>Contact Name: {contact.first_name} {contact.last_name}</ContactNameText>
          <PhoneNumberText>Phone Number: {contact.phone_number}</PhoneNumberText>
          <ButtonContainer>
            <TouchableOpacity onPress={handleEditContact}>
              <Icon2 name="edit" size={30} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteContact} testID="delete-contact-button" >
              <Icon name="trash" size={30} color="gray" />
            </TouchableOpacity>
          </ButtonContainer>
          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>{success}</SuccessText>}
        </ContactInfo>
      ) : (
        <Text>Loading contact details...</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
      >
        <ModalContainer>
          <ModalText>Are you sure you want to delete this contact?</ModalText>
          <TouchableCta onPress={handleDelete}>
            <CtaButtonText>Delete</CtaButtonText>
          </TouchableCta>
          <TouchableCta onPress={() => setDeleteModalVisible(false)}>
            <CtaButtonText>Cancel</CtaButtonText>
          </TouchableCta>
        </ModalContainer>
      </Modal>
    </ComponentContainer>
  );
};

export default ContactDetails;
