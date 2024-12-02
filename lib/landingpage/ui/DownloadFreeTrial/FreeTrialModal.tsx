import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { HospitalRegistrationForm } from "../../../hospital/ui/HospitalRegistrationForm";

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
          <Heading w="full">Туршилтын хувилбар татах</Heading>
          <HospitalRegistrationForm onClose={onClose} isTrial={true} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
