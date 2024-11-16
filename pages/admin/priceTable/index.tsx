import { AdminLayout } from "@lib/admin/ui";
import { AdminPriceTable } from "@lib/admin/ui/pages/product/AdminPriceTable";
import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import NotFoundPage from "pages/404";

const AdminPriceTablePage = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <AdminPriceTable />
    </AdminLayout>
  );
};

export default withRequireLogin(AdminPriceTablePage);
