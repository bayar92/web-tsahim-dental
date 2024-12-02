import { HospitalLayout } from "@lib/admin/ui/layout/HospitalLayout";
import { HospitalHome } from "@lib/hospital/ui/HospitalHome";
import { withRequireLogin } from "@lib/auth/ui";
import { useGetMyHospital } from "@lib/hospital/data/hooks";
import { HospitalSubscription } from "@lib/hospital/ui/HospitalSubscription";

const HospitalHomePage = () => {
  return (
    <HospitalLayout>
      <HospitalSubscription />
    </HospitalLayout>
  );
};
export default withRequireLogin(HospitalHomePage);
