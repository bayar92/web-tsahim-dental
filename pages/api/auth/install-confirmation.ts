import { createHandler } from "@api/handler";
import { createMachine, getMachineById } from "@lib/hospital/api/machineService";
import {
  verifyUserByPhoneNumber
} from "@lib/user/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    if (!req.body.phoneNumber) {
      return res.sendSuccess({
        success: false,
        message: "validation.phoneNumber"
      });
    }

    if (!req.body.confirmationCode)
      return res.sendSuccess({
        success: false,
        message: "confirmationCode not found"
      });
    if (!req.body.machineId || !req.body.machineName)
      return res.sendSuccess({
        success: false,
        message: "validation.machine-id"
      });
    if (!req.body.os)
      return res.sendSuccess({
        success: false,
        message: "validation.os"
      });

    const user = await verifyUserByPhoneNumber(
      req.body.phoneNumber,
      req.body.confirmationCode
    );

    if (!user)
      return res.sendSuccess({
        success: false,
        message: "user.not-found"
      });

    let ipAddress = req.headers["x-real-ip"] || req.connection.remoteAddress;
    if (ipAddress === undefined) ipAddress = "::";

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
    res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});
export default handler;
