import AsyncStorage from '@react-native-async-storage/async-storage';

export const BACKEND_ROOT_DOMAIN = 'https://jvec-assessment-backend-772115258ae7.herokuapp.com';

// Function to generate headers with authorization token
export const getHeaders = async () => {
  const token = await AsyncStorage.getItem('authToken');
  const headers = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
  };
  return headers;
};
