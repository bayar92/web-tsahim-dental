import { AdminLayout } from "@lib/admin/ui";
import { AdminRevenue } from "@lib/admin/ui/pages/product/AdminRevenue";
import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import NotFoundPage from "pages/404";

const AdminRevenuePage = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <AdminRevenue />
    </AdminLayout>
  );
};
export default withRequireLogin(AdminRevenuePage);
