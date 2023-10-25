import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { CustomModalProps } from '../constants/types';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  align-items: center;
`;

const ModalText = styled.Text`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #007BFF;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

const CustomModal = ({ visible, text, onConfirm, onCancel }: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <ModalContainer>
        <ModalContent>
          <ModalText>{text}</ModalText>
          <ButtonContainer>
            <ActionButton onPress={onConfirm}>
              <ButtonText>Yes</ButtonText>
            </ActionButton>
            <ActionButton onPress={onCancel}>
              <ButtonText>No</ButtonText>
            </ActionButton>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default CustomModal;
