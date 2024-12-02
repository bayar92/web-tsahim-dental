import { ReactNode } from "react";
import { useAuth } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AppLayout, Flex } from "@ui/index";

import NotFoundPage from "pages/404";
import { HospitalSidebar } from "./HospitalSideBar";

export const HospitalLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return user?.role !== UserRole.HOSPITAL_OWNER &&
    user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AppLayout canChangeLogo={true}>
      <Flex
        h="full"
        mt={4}
        flexDirection="column"
        borderTop="1px"
        borderColor="gray.200"
      >
        <Flex flex="1" fontSize="sm">
          <HospitalSidebar />
          <Flex p="4" width="full" direction="column" overflowY="auto">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </AppLayout>
  );
};
