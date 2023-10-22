import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Contact, RootStackParamList } from '../constants/types';
import {
  ComponentContainer,
  CtaButtonText,
  ModalContainer,
  ModalText,
  TouchableCta,
} from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, Modal } from 'react-native';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';

const ContactItem = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const ContactName = styled.Text`
  font-size: 18px;
  color: #333;
`;

const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/list/`);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleContactPress = (contactId: number) => {
    navigation.navigate('ContactDetails', { contactId: contactId });
  };

  const handleDeleteContact = (contactId: number) => {
    setContactToDelete(contactId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (contactToDelete) {
      try {
        const response = await fetch(
          `${BACKEND_ROOT_DOMAIN}/contacts/delete/${contactToDelete}/`,
          {
            method: 'DELETE',
          }
        );
        if (response.status === 204) {
          // Contact deleted successfully
          setContacts(contacts.filter((contact) => contact.id !== contactToDelete));
        } else {
          console.error('Failed to delete contact');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setDeleteModalVisible(false);
  };

  return (
    <ComponentContainer>
      {contacts.map((contact) => (
        <TouchableOpacity
          key={contact.id}
          onPress={() => handleContactPress(contact.id)}
        >
          <ContactItem key={contact.id}>
            <ContactName>
              {contact.first_name} {contact.last_name}
            </ContactName>
            <TouchableOpacity onPress={() => handleDeleteContact(contact.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </ContactItem>
        </TouchableOpacity>
      ))}

      {contacts.length === 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateContact')}
        >
          <ContactItem>
            <ContactName>Add Contact</ContactName>
          </ContactItem>
        </TouchableOpacity>
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

export default ContactsList;
