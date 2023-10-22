import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { ComponentContainer, CtaButtonText, TouchableCta } from '../styles/styles';

const HomepageText = styled.Text`
  font-size: 24px;
  color: #333;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;

const Homepage = () => {

  const navigation = useNavigation();

  return (
    <ComponentContainer>
      <HomepageText>Contact Manager</HomepageText>
      <ButtonContainer>
        <TouchableCta onPress={() => navigation.navigate('Register' as never)}>
          <CtaButtonText>Signup</CtaButtonText>
        </TouchableCta>
      </ButtonContainer>
      <ButtonContainer>
        <TouchableCta onPress={() => navigation.navigate('Login' as never)}>
          <CtaButtonText>Login</CtaButtonText>
        </TouchableCta>
      </ButtonContainer>
    </ComponentContainer>
  );
};

export default Homepage;
