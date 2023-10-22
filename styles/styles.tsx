import styled from 'styled-components/native';

export const ComponentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

export const FormContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
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

export const CtaButton = styled.Button`
  width: 80%;
  background-color: #007BFF;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
`;

export const TouchableCta = styled.TouchableOpacity`
  background-color: #007BFF;
  padding: 15px 20px;
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

export const ContactNameText = styled.Text`
  font-size: 18px;
  color: #333;
`;

export const PhoneNumberText = styled.Text`
  font-size: 18px;
  color: #333;
`;
