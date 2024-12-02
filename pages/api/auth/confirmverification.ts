import { createHandler } from "@api/handler";
import {
  createUserWithPhoneNumberValidate,
  verifyUserByPhoneNumber,
} from "@lib/user/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    if (!req.body.phoneNumber)
      throw AppError.BadRequest("validation.phoneNumber");
    if (!req.body.confirmationCode) throw AppError.BadRequest("validation.pin");

    const user = await verifyUserByPhoneNumber(
      req.body.phoneNumber,
      req.body.confirmationCode
    );
    if (!user) throw AppError.NotFound("user.not-found");

    res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});
export default handler;
