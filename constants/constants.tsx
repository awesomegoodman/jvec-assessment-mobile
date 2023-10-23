import AsyncStorage from '@react-native-async-storage/async-storage';

// export const BACKEND_ROOT_DOMAIN = 'http://192.168.43.150:8000';
// export const BACKEND_ROOT_DOMAIN = 'http://127.0.0.1:8000';
export const BACKEND_ROOT_DOMAIN = 'https://d7f1-105-113-88-236.ngrok.io';

// Function to generate headers with authorization token
export const getHeaders = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const headers = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
  };
  return headers;
};
