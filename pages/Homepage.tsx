import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { ComponentContainer, CtaButtonText, TouchableCta } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';

const DescriptionText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Homepage = () => {
  const navigation = useNavigation();

  return (
    <ComponentContainer>
      <DescriptionText>
        Manage your contacts on the fly!
      </DescriptionText>
      <Icon name="home" size={50} color="black" />
      <ButtonContainer>
        <TouchableCta onPress={() => navigation.navigate('Register' as never)}>
          <CtaButtonText>Signup</CtaButtonText>
        </TouchableCta>
        <TouchableCta onPress={() => navigation.navigate('Login' as never)}>
          <CtaButtonText>Login</CtaButtonText>
        </TouchableCta>
      </ButtonContainer>
    </ComponentContainer>
  );
};

export default Homepage;
