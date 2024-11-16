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
import { FreeTrialScreen } from "./FreeTrialScreen";

export const FreeTrialModal = ({
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
          <FreeTrialScreen onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
