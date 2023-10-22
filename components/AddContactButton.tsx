import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const AddButtonContainer = styled(TouchableOpacity)`
  padding: 10px;
`;

const AddButtonText = styled.Text`
  color: blue;
`;

const AddButton = () => {
  const navigation = useNavigation();

  return (
    <AddButtonContainer onPress={() => navigation.navigate('CreateContact' as never)}>
      <AddButtonText>Add</AddButtonText>
    </AddButtonContainer>
  );
};

export default AddButton;
