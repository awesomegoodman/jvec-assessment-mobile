import AsyncStorage from '@react-native-async-storage/async-storage';

// export const BACKEND_ROOT_DOMAIN = 'http://192.168.43.150:8000';
export const BACKEND_ROOT_DOMAIN = 'https://2bd0-105-113-88-236.ngrok.io';

// Function to generate headers with authorization token
export const getHeaders = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const headers = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
  };
  return headers;
};
