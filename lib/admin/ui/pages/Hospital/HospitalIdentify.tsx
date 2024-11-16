import { Button, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "@lib/auth/ui";
import { HospitalIdentifyModel } from "./HospitalIdentifyModel";

export const HospitalIdentify = ({
  title,
  content,
  signature,
}: {
  title: string;
  content: string[];
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
      <HospitalIdentifyModel
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
