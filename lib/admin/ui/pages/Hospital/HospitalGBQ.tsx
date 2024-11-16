import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "@lib/auth/ui";
import { HospitalGBQModal } from "./HospitalGBQModal";

export const HospitalGBQ = ({
  title,
  content,
  signature,
}: {
  title: string;
  content: {
    status: boolean;
    info: string;
    answer?: string;
  }[];
  signature: string;
}) => {
  const { isLoading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onCloseGlobal = () => {
    onClose();
  };
  return (
    <>
      <Button
        isLoading={isLoading}
        onClick={onOpen}
        _hover={{ bg: "gray.300", color: "black" }}
        w="full"
        bg="gray.400"
      >
        {title}
      </Button>
      <HospitalGBQModal
        title={title}
        content={content}
        signature={signature}
        isOpen={isOpen}
        onClose={onCloseGlobal}
        onOpen={onOpen}
      />
    </>
  );
};
