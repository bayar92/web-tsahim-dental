import {
  Box,
  Image,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react";

export const HospitalIdentifyModel = ({
  isOpen,
  onOpen,
  onClose,
  title,
  content,
  signature,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  content: string[];
  signature: string;
}) => {
  return (
    <Modal isOpen={isOpen} size="3xl" onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <VStack p={8}>
            <Text fontSize="2xl" fontWeight="bold">
              {title}
            </Text>
            <OrderedList py={4}>
              {content.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </OrderedList>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Үйлчлүүлэгчийн гарын үсэг
              </Text>
              <Text>
                (Таны шүдний эмчилгээний тайлбарыг уншиж танилцсанг батлана.)
              </Text>
              <Image src="/images/dental-text.svg" alt="" h={12}></Image>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
