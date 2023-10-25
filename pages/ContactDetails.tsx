import React, { useState, useEffect } from 'react';
import { Contact, RootStackParamList } from '../constants/types';
import {
  ComponentContainer,
  ContactName,
  ErrorText,
  LabelText,
  ScrollableContainer,
  SuccessText,
} from '../styles/styles';
import styled from 'styled-components/native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { BACKEND_ROOT_DOMAIN } from '../constants/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import { screenNames } from '../constants/screenNames';
import CustomModal from '../components/Modal';


const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border: gray;
  border-radius: 10px;
  margin: 2px
`;

const ContactItem = styled.View`
  padding: 10px;
  width: 95%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: gray;
  border-radius: 10px;
  margin-bottom: 10px;
  height: auto;
`;

const ContactInfo = styled.View`
  flex: 5;
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
      .catch((err) => console.error('Error:', err));
  }, [contactId]);

  const handleEditContact = () => {
    // Navigate to the EditContact page with the contactId as a parameter
    navigation.navigate(screenNames.EditContact, { contact: contact });
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
        navigation.navigate(screenNames.Contacts as never);
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
    <ScrollableContainer>
      <ComponentContainer>
        {contact ? (
          <ContactItem>
            <ContactInfo>
              <LabelText>Contact Name</LabelText>
              <ContactName testID="contact-name">{contact.first_name} {contact.last_name}</ContactName>

              <LabelText>Phone Number</LabelText>
              <ContactName testID="phone-number">{contact.phone_number}</ContactName>
            </ContactInfo>
            <ButtonContainer>
              <Icon2 name="pencil" size={30} color="gray" onPress={handleEditContact} />
            </ButtonContainer>
            <ButtonContainer>
              <Icon name="trash" size={30} color="gray" onPress={handleDeleteContact} testID="delete-contact-button" />
            </ButtonContainer>
          </ContactItem>
        ) : (
          <></>
        )}

        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}

        <CustomModal
          visible={deleteModalVisible}
          text="Are you sure you want to delete this contact?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalVisible(false)}
        />

      </ComponentContainer>
    </ScrollableContainer>
  );
};

export default ContactDetails;
