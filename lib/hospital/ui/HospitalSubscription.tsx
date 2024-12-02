import { VStack } from "@chakra-ui/react";
import { useAuth } from "@lib/auth/ui";
import { Pricing } from "@lib/landingpage/ui/Price/Pricing";

export const HospitalSubscription = () => {
  const { user } = useAuth();
  return (
    <VStack>
      <Pricing user={user} />
    </VStack>
  );
};
