import { createHandler } from "@api/handler";
import { createMessage } from "@lib/message/api/service";
import {
  createUserWithPhoneNumber,
  getUserByPhoneNumber,
} from "@lib/user/api/service";
import { validatePhoneNumber } from "@lib/user/data/validators";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const isValid = await validatePhoneNumber(req.body.phoneNumber, "+976");
    if (!isValid.isValid) throw AppError.BadRequest("Буруу утасны дугаар");
    //check is valid
    let user = await getUserByPhoneNumber(req.body.phoneNumber);

    if (user) throw AppError.BadRequest("Утасны дугаар бүртгэлтэй байна.");

    const verifyToken = await Math.floor(
      100000 + Math.random() * 9000
    ).toString();

    await createUserWithPhoneNumber(req.body.phoneNumber, verifyToken);
    await createMessage(
      req.body.phoneNumber,
      verifyToken,
      "cm1k7qbdt0001lu6rv13b7b9t"
    );
    res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});
export default handler;
