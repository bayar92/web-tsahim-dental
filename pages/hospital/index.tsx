import { HospitalLayout } from "@lib/admin/ui/layout/HospitalLayout";
import { HospitalHome } from "@lib/admin/ui/pages/HospitalHome";
import { withRequireLogin } from "@lib/auth/ui";

const HospitalHomePage = () => (
  <HospitalLayout>
    <HospitalHome />
  </HospitalLayout>
);
export default withRequireLogin(HospitalHomePage);
