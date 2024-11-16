import {
  Box,
  Image,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";

export const HospitalGBQModal = ({
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
  content: {
    status: boolean;
    info: string;
    answer?: string;
  }[];
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
            <List py={4} spacing={3}>
              {content.map((item, index) => (
                <ListItem key={index}>
                  <ListIcon
                    as={
                      item.status
                        ? IoMdCheckmarkCircleOutline
                        : IoMdCloseCircleOutline
                    }
                    color={item.status ? "green.500" : "red.500"}
                  />
                  {item.info}
                  <Text>{item.answer}</Text>
                </ListItem>
              ))}
            </List>
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
