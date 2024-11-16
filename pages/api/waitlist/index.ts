import { createHandler } from "@api/handler";
import { getWaitList } from "@lib/waitlist/api/service";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();
  if (req.user.role !== UserRole.ADMIN) throw AppError.Forbidden();
  res.sendSuccess(await getWaitList(req.body));
});

export default handler;
