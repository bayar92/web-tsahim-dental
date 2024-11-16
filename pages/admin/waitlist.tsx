import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { WaitList } from "@lib/waitlist/ui";
import { UserRole } from "@prisma/client";
import NotFoundPage from "pages/404";

const AdminWaitList = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <WaitList />
    </AdminLayout>
  );
};

export default withRequireLogin(AdminWaitList);
