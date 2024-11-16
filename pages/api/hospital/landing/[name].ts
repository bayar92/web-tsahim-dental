import { createHandler } from "@api/handler";
import { getHospitalPublicInfo } from "@lib/hospital/api/service";

const handler = createHandler();

handler.post(async (req, res) => {
  const hospitalName = req.query.name as string; //hospital name
  if (!hospitalName)
    return res.sendError({ message: "Hospital name is required" });
  res.sendSuccess({ hospitalInfo: await getHospitalPublicInfo(hospitalName) });
});

export default handler;
