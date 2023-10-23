import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Contact, RootStackParamList } from '../constants/types';
import {
  ComponentContainer,
  ContactItem,
  ContactName,
  ScrollableContainer,
} from '../styles/styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomModal from '../components/Modal';
import { screenNames } from '../constants/screenNames';

const TextContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  width: 80%;
`;

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border: gray;
  border-radius: 10px;
`;


const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ContactsList'>>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${BACKEND_ROOT_DOMAIN}/contacts/list/`);
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchContacts();
  }, [route.params]);

  const handleContactPress = (contact: Contact) => {
    navigation.navigate(screenNames.ContactDetails, { contact: contact });
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
        const data = response.json();
        console.log(data);
        if (response.status === 204 || response.status === 200 || response.ok) {
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
    <ScrollableContainer>
      <ComponentContainer>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
          >
            <TextContainer
              key={contact.id}
              onPress={() => handleContactPress(contact)}
            >
              <ContactName>
                {contact.first_name} {contact.last_name}
              </ContactName>
            </TextContainer>
            <ButtonContainer onPress={() => handleDeleteContact(contact.id)}>
              <Icon name="trash" size={30} color="gray" />
            </ButtonContainer>
          </ContactItem>
        ))}

        {!isLoading && contacts.length === 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.AddContact)}
          >
            <ButtonContainer>
              <Icon2 name="adduser" size={30} color="gray" />
            </ButtonContainer>
          </TouchableOpacity>
        )}

        <CustomModal
          visible={deleteModalVisible}
          text="Are you sure you want to delete this contact?"
          onDelete={handleDelete}
          onCancel={() => setDeleteModalVisible(false)}
        />

      </ComponentContainer>
    </ScrollableContainer>
  );
};

export default ContactsList;
