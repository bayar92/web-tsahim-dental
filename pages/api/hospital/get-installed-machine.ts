

import { createHandler } from "@api/handler";
import { getHospitalsMachines } from "@lib/hospital/api/machineService";
import {
    getMyHospital
} from "@lib/hospital/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
    if (!req.user) throw AppError.Unauthorized();

    let hospital = (req.user as any).hospital?.[0];
    if (!hospital) {
        hospital = await getMyHospital(req.user.id);
    }

    const machines = await getHospitalsMachines(req.user.id);

    res.sendSuccess(machines);
});

export default handler;
