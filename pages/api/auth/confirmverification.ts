import { createHandler } from "@api/handler";
import { AppError } from "@util/errors";
import { validatePhoneNumber } from "@lib/user/data/validators";
import {
  createUserWithPhoneNumberValidate,
  getUserByPhoneNumber,
} from "@lib/user/api/service";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    if (!req.body.confirmationCode) throw AppError.BadRequest("validation.pin");

    const user = await getUserByPhoneNumber(req.body.phoneNumber);
    if (!user) throw AppError.NotFound("user.not-found");

    await createUserWithPhoneNumberValidate(user.id, req.body.confirmationCode);
    res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});
export default handler;
