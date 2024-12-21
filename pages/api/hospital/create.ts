import { createHandler } from "@api/handler";
import {
  createHospital,
  getMyHospital,
  updateHospital,
} from "@lib/hospital/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();
  //create if my hosputal is null
  const myHospital = await getMyHospital(req.user.id);
  if (!myHospital) {
    res.sendSuccess(await createHospital(req.body, req.user.id));
  } else {
    res.sendSuccess(await updateHospital({ ...req.body, id: myHospital.id }, req.user.id));
  }
});

export default handler;
