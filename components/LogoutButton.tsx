import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { screenNames } from '../constants/screenNames';
import { BACKEND_ROOT_DOMAIN, getHeaders } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutButtonContainer = styled(TouchableOpacity)`
  padding: 10px;
`;

const LogoutButton = () => {

    const navigation = useNavigation();

    const handleLogout = async () => {
        try {

        const headers = await getHeaders();

        const response = await fetch(`${BACKEND_ROOT_DOMAIN}/users/logout/`, {
            method: 'POST',
            headers: headers,
        });

        if (response.status === 200) {
            await AsyncStorage.removeItem('authToken');
            // Navigate the user back to the login screen
            navigation.navigate(screenNames.Login as never);
        } else {
            // Handle other response statuses (e.g., unauthorized)
            console.error('Logout failed');
        }
        } catch (err) {
        console.error('Logout failed:', err);
        }
    };

    return (
        <LogoutButtonContainer onPress={handleLogout}>
            <Icon name="logout" size={30} color="gray" />
        </LogoutButtonContainer>
    );
};

export default LogoutButton;
