import { Text } from "@chakra-ui/react";
import { HospitalLayout } from "@lib/admin/ui/layout/HospitalLayout";
import { HospitalTime } from "@lib/admin/ui/pages/Hospital/HospitalTime";
import { withRequireLogin } from "@lib/auth/ui";

const HospitalTimePage = () => (
  <HospitalLayout>
    <Text fontSize={24} mb={8}>
      Шүдний цаг
    </Text>
    <HospitalTime />
  </HospitalLayout>
);
export default withRequireLogin(HospitalTimePage);
