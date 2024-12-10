import { createStandaloneToast, ToastPosition } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../theme";
const position = "top";
const duration = 9000;
const isClosable = true;

const { toast } = createStandaloneToast({ theme });

export const toaster = {
  closeAll() {
    toast.closeAll();
  },
  success(message: ReactNode, title = "", positionManual?: ToastPosition) {
    toast.closeAll();
    toast({
      title,
      description: message,
      status: "success",
      position: positionManual ? positionManual : position,
      duration,
      isClosable,
    });
  },
  loading(message: ReactNode, title = "", positionManual?: ToastPosition) {
    toast.closeAll();
    toast({
      title,
      description: message,
      status: "loading",
      position: positionManual ? positionManual : position,
      duration,
      isClosable,
    });
  },

  info(message: ReactNode, title = "") {
    toast.closeAll();
    toast({
      title,
      description: message,
      status: "info",
      position,
      duration,
      isClosable,
    });
  },
  warning(message: string, title = "") {
    toast.closeAll();
    toast({
      title,
      description: message,
      status: "warning",
      position,
      duration,
      isClosable,
    });
  },
  error(message: string, title = "") {
    toast.closeAll();
    toast({
      title,
      description: message,
      status: "error",
      position,
      duration,
      isClosable,
    });
  },
};
