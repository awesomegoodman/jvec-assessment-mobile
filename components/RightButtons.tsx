import React from 'react';
import AddButton from './AddContactButton';
import LogoutButton from './LogoutButton';
import { View } from 'react-native';
import styled from 'styled-components/native';

const HeaderButtonContainer = styled(View)`
  flex-direction: row;
  margin-right: 3px;
`;

const RightButtons = () => {
    return (
      <HeaderButtonContainer>
        <AddButton />
        <LogoutButton />
      </HeaderButtonContainer>
    );
};

export default RightButtons;
