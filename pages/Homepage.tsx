import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { ComponentContainer, CtaButtonText, TouchableCta } from '../styles/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { screenNames } from '../constants/screenNames';

const DescriptionText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
`;

const Homepage = () => {
  const navigation = useNavigation();

  return (
    <ComponentContainer>
      <Icon name="home" size={50} color="black" />
      <DescriptionText>
        Manage your contacts on the fly!
      </DescriptionText>
        <TouchableCta onPress={() => navigation.navigate(screenNames.Register as never)}>
          <CtaButtonText>Signup</CtaButtonText>
        </TouchableCta>
        <TouchableCta onPress={() => navigation.navigate(screenNames.Login as never)}>
          <CtaButtonText>Login</CtaButtonText>
        </TouchableCta>
    </ComponentContainer>
  );
};

export default Homepage;
