import {
  SEO,
  AppLayout,
  Card,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";

const TermsOfService = () => {
  const { t: to } = useTranslation("common");

  return (
    <AppLayout title={to(`terms-of-service`)} contentWidth={"container.xl"}>
      <SEO title="Үйлчилгээний нөхцөл" />
      <Card my={6}>
        <Stack></Stack>
      </Card>
    </AppLayout>
  );
};

export default TermsOfService;
