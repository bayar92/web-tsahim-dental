import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Pricing } from "@lib/landingpage/ui/Price/Pricing";
import { useMyHospitalSubscription } from "@lib/subscription/data/subscriptionHooks";
import {
  MdAttachMoney,
  MdCalendarMonth,
  MdCancel,
  MdCheckCircle,
  MdComputer,
  MdShoppingCart,
} from "react-icons/md";
import { HospitalPaymentHistory } from "./HospitalPaymentHistory";

interface Subscription {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  totalDays: number;
  isStarted: boolean;
  createdAt: Date;
  updatedAt: Date;
  hospitalId: string | null;
}

export const HospitalSubscription = () => {
  const { data: subscription, isLoading } = useMyHospitalSubscription();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isActive =
    subscription?.isStarted &&
    subscription?.endDate &&
    new Date(subscription.endDate) > new Date();
  const remainingDays = subscription?.endDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(subscription.endDate).getTime() - new Date().getTime()) /
            (1000 * 3600 * 24)
        )
      )
    : 0;

  return (
    <Stack spacing={6}>
      <HStack>
        <Icon color="gray.400" as={MdAttachMoney} fontSize="24px" />
        <Text fontSize={24} mb={8}>
          Худалдан авалт
        </Text>
      </HStack>
      <Card p={6}>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Ашиглах хоногууд
            </Text>
            <Button size="sm" variant="secondary" onClick={onOpen}>
              <Icon as={MdShoppingCart} mr="2" />
              Өмнөх худалдан авалтууд
            </Button>
          </HStack>
          <Box>
            <Text color="gray.600" mb={1}>
              Одоогийн төлөв
            </Text>
            <Text fontWeight="medium">
              {isActive ? (
                <HStack>
                  <Icon as={MdCheckCircle} color="green.500" />{" "}
                  <Text>Идэвхитэй</Text>
                </HStack>
              ) : (
                <HStack>
                  <Icon as={MdCancel} color="red.500" /> <Text>Идэвхигүй</Text>
                </HStack>
              )}
            </Text>
          </Box>
          <Stack direction={["column", "row"]} spacing={8}>
            <HStack>
              <Text>
                <Icon as={MdCalendarMonth} fontSize="36px" />
              </Text>
              <Box>
                <Text color="gray.600" mb={1}>
                  Эхэлсэн огноо
                </Text>
                <Text fontWeight="medium">
                  {subscription?.startDate
                    ? new Date(subscription.startDate)
                        .toISOString()
                        .split("T")[0]
                    : "-"}
                </Text>
              </Box>
            </HStack>
            <HStack>
              <Text>
                <Icon as={MdCalendarMonth} fontSize="36px" />
              </Text>
              <Box>
                <Text color="gray.600" mb={1}>
                  Дуусах огноо
                </Text>
                <Text fontWeight="medium">
                  {subscription?.endDate
                    ? new Date(subscription.endDate).toISOString().split("T")[0]
                    : "-"}
                </Text>
              </Box>
            </HStack>
            <Box>
              <Text color="gray.600" mb={1}>
                Үлдсэн хоног
              </Text>
              <Text fontWeight="medium">{remainingDays} хоног</Text>
            </Box>
          </Stack>
        </VStack>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent maxW="90vw">
          <ModalHeader>
            <HStack>
              <Icon as={MdShoppingCart} />
              <Heading size="md">Худалдан авалтын түүх</Heading>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HospitalPaymentHistory />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Үнийн сонголт
        </Text>
        <Pricing />
      </Box>
    </Stack>
  );
};
