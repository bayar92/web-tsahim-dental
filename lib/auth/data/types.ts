import { UserRole } from "@prisma/client";

export const getRootUrl = (
  user: { role: UserRole } | undefined | null
): string => {
  if (!user || !user.role) return "";
  if (user.role === UserRole.ADMIN) return "/admin";
  if (user.role === UserRole.USER) return "/hospital";
  return "";
};
