import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

export const ScrollableContainer = styled(ScrollView)`
  flex: 1;
  background-color: #f0f0f0;
`;

export const ComponentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 200%;
`;

export const ButtonContainer = styled.View`
  margin-top: auto;
  margin-bottom: auto;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FormContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f0f0f0;
  padding: 20px;
`;

export const CtaText = styled.Text`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const InputField = styled.TextInput`
  width: 80%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  
`;

export const ErrorText = styled.Text`
  color: red;
  padding: 10px;
  font-size: 16px;
`;

export const SuccessText = styled.Text`
  color: #32CD32;
  padding: 10px;
  font-size: 16px;
`;

export const TouchableCta = styled.TouchableOpacity`
  background-color: #007BFF;
  padding: 10px;
  width: 80%;
  border-radius: 5px;
  margin: 20px;
`;

export const CtaButtonText = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
`;

export const DeleteButton = styled.Text`
  color: #FF0000;
  font-size: 18px;
  text-decoration: underline;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalText = styled.Text`
  font-size: 24px;
  color: #333;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export const LabelText = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: left;
  width: 100%;
  margin-top: 10px;
`;

export const ContactName = styled.Text`
  font-size: 18px;
  color: #333;
  text-align: left;
  width: 100%;
`;

export const ContactItem = styled.View`
  padding: 10px;
  width: 95%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: gray;
  border-radius: 10px;
  margin-bottom: 10px;
  height: auto;
`;

export const placeholderTextColor = 'gray';
