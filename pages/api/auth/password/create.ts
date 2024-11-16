import { createHandler } from "@api/handler";
import {
  changePasswordByToken,
  getUserByUnusedToken,
} from "@lib/user/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  const userToken = await getUserByUnusedToken(req.body.token);
  if (userToken === null || userToken?.isTokenUsed != null)
    throw AppError.BadRequest("validation.invitation-token.invalid");

  return res.sendSuccess({ success: true });
});

handler.put(async (req, res, next) => {
  try {
    const userToken = await getUserByUnusedToken(req.body.token);
    if (userToken === null || userToken?.isTokenUsed != null)
      throw AppError.BadRequest("validation.invitation-token.invalid");

    //Update password here
    const user = await changePasswordByToken({
      inviteToken: req.body.token,
      password: req.body.password,
    });
    if (!user) throw AppError.BadRequest("validation.invitation-token.invalid");

    // Automatic login
    req.login(user, () => (req.session.userId = user.id));
    return res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
