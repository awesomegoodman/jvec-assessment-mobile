import React, { useState, useEffect } from 'react';
import { Contact, RootStackParamList } from '../constants/types';
import {
  ComponentContainer,
  CtaButtonText,
  DeleteButton,
  ModalContainer,
  ModalText,
  TouchableCta,
} from '../styles/styles';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, Modal } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';
import { StackNavigationProp } from '@react-navigation/stack';

const ContactInfo = styled.View`
  font-size: 18px;
  color: #333;
`;

const EditButton = styled.Text`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

const ContactDetails = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'ContactDetails'>>();
  const { contactId } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    // Fetch the contact details from Django backend based on the contact ID
    fetch(`${BACKEND_ROOT_DOMAIN}/contacts/detail/${contactId}/`)
      .then((response) => response.json())
      .then((data) => setContact(data))
      .catch((error) => console.error('Error:', error));
  }, [contactId]);

  const handleEditContact = () => {
    // Navigate to the EditContact page with the contactId as a parameter
    navigation.navigate('EditContact', { contactId: contactId });
  };

  const handleDeleteContact = () => {
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/delete/${contactId}/`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        // Contact deleted successfully
        navigation.navigate('ContactsList' as never); // Navigate back to the ContactsList page
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setDeleteModalVisible(false);
  };

  return (
    <ComponentContainer>
      {contact ? (
        <ContactInfo>
          <Text>Contact Name: {contact.first_name} {contact.last_name}</Text>
          <Text>Phone Number: {contact.phone_number}</Text>
          <TouchableOpacity onPress={handleEditContact}>
            <EditButton>Edit</EditButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteContact}>
            <DeleteButton>Delete</DeleteButton>
          </TouchableOpacity>
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
