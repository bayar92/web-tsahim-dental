import { createHandler } from "@api/handler";
import { createMachine, getMachineById } from "@lib/hospital/api/machineService";
import {
  verifyUserByPhoneNumber
} from "@lib/user/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    if (!req.body.phoneNumber)
      throw AppError.BadRequest("validation.phoneNumber");
    if (!req.body.confirmationCode) throw AppError.BadRequest("validation.pin");
    if (!req.body.machineId || !req.body.machineName) throw AppError.BadRequest("validation.machine-id");
    if (!req.body.os) throw AppError.BadRequest("validation.os");

    const user = await verifyUserByPhoneNumber(
      req.body.phoneNumber,
      req.body.confirmationCode
    );
    let ipAddress = req.headers["x-real-ip"] || req.connection.remoteAddress;
    if (ipAddress === undefined) ipAddress = "::";

    if (!user) throw AppError.NotFound("user.not-found");

    if (user) {
      const machine = await getMachineById(req.body.machineId, user.id);
      console.log(req.body);
      if (!machine) {
        const machineFingerprint = await createMachine(req.body.machineId,
          req.body.machineName,
          user.id,
          ipAddress as string,
          req.body.os
        );
      }
    }
    res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});
export default handler;
