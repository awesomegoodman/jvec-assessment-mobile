import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';


const AddButtonContainer = styled(TouchableOpacity)`
  padding: 10px;
`;

const AddButton = () => {
  const navigation = useNavigation();

  return (
    <AddButtonContainer onPress={() => navigation.navigate('Add contact' as never)}>
      <Icon name="adduser" size={30} color="gray" />
    </AddButtonContainer>
  );
};

export default AddButton;
