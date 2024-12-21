import { HospitalLayout } from "@lib/admin/ui/layout/HospitalLayout";
import { withRequireLogin } from "@lib/auth/ui";
import { HospitalMachine } from "@lib/hospital/ui/HospitalMachine";

const HospitalHomePage = () => {
  return (
    <HospitalLayout>
      <HospitalMachine />
    </HospitalLayout>
  );
};
export default withRequireLogin(HospitalHomePage);
