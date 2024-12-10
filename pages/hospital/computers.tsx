import { HospitalLayout } from "@lib/admin/ui/layout/HospitalLayout";
import { withRequireLogin } from "@lib/auth/ui";

const HospitalHomePage = () => {
  return (
    <HospitalLayout>
      <></>
    </HospitalLayout>
  );
};
export default withRequireLogin(HospitalHomePage);
