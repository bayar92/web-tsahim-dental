import { createHandler } from "@api/handler";
import {
  getHospitalPublicInfo,
  getMyHospital,
} from "@lib/hospital/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();

  res.sendSuccess(await getMyHospital(req.user.id));
});

export default handler;
