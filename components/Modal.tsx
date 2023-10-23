import React from 'react';
import { Modal } from 'react-native';
import {
  ModalContainer,
  ModalText,
  ButtonContainer as ModalButtonContainer,
  TouchableCta,
  CtaButtonText,
} from '../styles/styles';
import { CustomModalProps } from '../constants/types';

const CustomModal = ({ visible, text, onDelete, onCancel }: CustomModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      renderToHardwareTextureAndroid={true}
    >
      <ModalContainer>
        <ModalText>{text}</ModalText>
        <ModalButtonContainer>
          <TouchableCta onPress={onDelete}>
            <CtaButtonText>Delete</CtaButtonText>
          </TouchableCta>
          <TouchableCta onPress={onCancel}>
            <CtaButtonText>Cancel</CtaButtonText>
          </TouchableCta>
        </ModalButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default CustomModal;
