import { AdminLayout } from "@lib/admin/ui";
import { AdminMessage } from "@lib/admin/ui/pages/AdminMessage";
import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import NotFoundPage from "pages/404";

const AdminMessagesPage = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <AdminMessage />
    </AdminLayout>
  );
};

export default withRequireLogin(AdminMessagesPage);
