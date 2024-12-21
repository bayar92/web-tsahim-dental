import { createHandler } from "@api/handler";
import {
  createHospital,
  getMyHospital, updateHospitalLogo
} from "@lib/hospital/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();
  //create if my hosputal is null
  const myHospital = await getMyHospital(req.user.id);

  if (!myHospital) {
    const emptyHospital = {
      name: undefined,
      phoneNumber: undefined,
      totalSit: undefined,
      register: undefined,
      directorInfo: undefined,
      hospitalLogo: req.body.logoUrl,
    };
    createHospital(emptyHospital, req.user.id);
  } else {
    console.log("req.body.logoUrl", req.body.logoUrl);
    await updateHospitalLogo(req.body.logoUrl, req.user.id);
  }

  res.sendSuccess({ success: true });
});

export default handler;
