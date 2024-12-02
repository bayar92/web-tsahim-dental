import { HospitalLayout } from "@lib/admin/ui/layout/HospitalLayout";
import { HospitalHome } from "@lib/hospital/ui/HospitalHome";
import { withRequireLogin } from "@lib/auth/ui";
import { useGetMyHospital } from "@lib/hospital/data/hooks";

const HospitalHomePage = () => {
  return (
    <HospitalLayout>
      <HospitalHome />
    </HospitalLayout>
  );
};
export default withRequireLogin(HospitalHomePage);
