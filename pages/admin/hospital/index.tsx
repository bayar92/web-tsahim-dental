import { AdminLayout } from "@lib/admin/ui";
import { AdminHospital } from "@lib/admin/ui/pages/Hospital/AdminHospital";
import { withRequireLogin } from "@lib/auth/ui";

const AdminHospitalPage = () => (
  <AdminLayout>
    <AdminHospital />
  </AdminLayout>
);

export default withRequireLogin(AdminHospitalPage);
