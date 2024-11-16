import {
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  useColorModeValue,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import { WaitScreen } from "./WaitScreen";

export const WaitModal = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <WaitScreen onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
