import AsyncStorage from '@react-native-async-storage/async-storage';

// export const BACKEND_ROOT_DOMAIN = 'http://192.168.43.150:8000';
export const BACKEND_ROOT_DOMAIN = 'https://25c7-105-113-104-94.ngrok.io';

// Function to generate headers with authorization token
export const getHeaders = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const headers = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
  };
  return headers;
};
