import { createHandler } from "@api/handler";
import { getHospitalByName } from "@lib/hospital/api/service";
import { createMessage } from "@lib/message/api/service";
import {
  getVerifiedUserByPhoneNumber, updateUserVerifyTokenByPhonenumber
} from "@lib/user/api/service";
import { validatePhoneNumber } from "@lib/user/data/validators";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const isValid = await validatePhoneNumber(req.body.phoneNumber, "+976");
    if (!isValid.isValid) throw AppError.BadRequest("Буруу утасны дугаар");
    //check is valid
    let user = await getVerifiedUserByPhoneNumber(req.body.phoneNumber);
    if (!user) throw AppError.BadRequest("Утасны дугаар бүртгэлгүй байна.");
    const verifyToken = "123456"
    // await Math.floor(
    //   100000 + Math.random() * 9000
    // ).toString();
    const hospital = await getHospitalByName("edental");
    if (!hospital)
      throw AppError.BadRequest(
        "edental Эмнэлэг олдсонгүй. Бүртгэл үүсгэх түр боломжгүй."
      );
    const notVerifiedUser = await updateUserVerifyTokenByPhonenumber(
      req.body.phoneNumber,
      verifyToken
    );

    const messageBody = "edental.mn batalgaajuulakh kod: " + verifyToken;
    verifyToken != "123456" && await createMessage(req.body.phoneNumber, messageBody, hospital.id);
    res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});
export default handler;
