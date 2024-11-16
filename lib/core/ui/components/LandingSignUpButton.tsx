import { Button, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "@lib/auth/ui";
import { SignUpModal } from "@lib/auth/ui/SignUpModal";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const LandingSignUpButton = () => {
  const { isLoading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  useEffect(() => {
    if (router.query?.signup) {
      onOpen();
    }
  }, [router, onOpen]);
  const onCloseGlobal = () => {
    router.push("/");
    onClose();
  };
  return (
    <>
      <Button
        ml={2}
        color={"primary.500"}
        fontSize={14}
        variant="outline"
        isLoading={isLoading}
        onClick={onOpen}
      >
        Бүртгүүлэх
      </Button>
      <SignUpModal isOpen={isOpen} onClose={onCloseGlobal} onOpen={onOpen} />
    </>
  );
};
