import { LoginPage } from "@lib/auth/ui/LoginPage";
import { Box, Heading, Spinner, VStack } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useGetHospitalInfo } from "../data/hooks";

export const HospitalLandingPage = ({
  hospitalDomain,
}: {
  hospitalDomain: string;
}) => {
  const { t } = useTranslation("app");
  const { data, isLoading } = useGetHospitalInfo(hospitalDomain);
  return (
    <Box w="full" pt={32}>
      {isLoading ? (
        <VStack>
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="primary.100"
            size="xl"
            color="primary.500"
          />
          <Heading>Эмнэлэгийн мэдээллийг yншиж байна.</Heading>
        </VStack>
      ) : (
        <LoginPage logoUrl={["/images/evada.jpg"]} />
      )}
    </Box>
  );
};
