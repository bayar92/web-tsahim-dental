import type { NextApiRequest, NextApiResponse } from "next";
import { getDbConnectionById, queryAppointments } from "@lib/db";
import { sendSMS } from "@lib/sms";
// import { markSmsSent } from "@lib/db";
import { markSmsData } from "@lib/db";

type HandlerType = "afternoon" | "tomorning";

function formatDateUTC(date: Date) {
  const yyyy = date.getUTCFullYear();
  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;
  const t = String(type) as HandlerType;

  let startUTC: Date, endUTC: Date;

  if (t === "afternoon") {
    const today = new Date();
    startUTC = new Date(today);
    startUTC.setUTCHours(13, 0, 0, 0);
    console.log("afternoon");
    endUTC = new Date(today);
    endUTC.setUTCHours(23, 59, 59, 999);
  } else if (t === "tomorning") {
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
console.log("tomorrow");
    startUTC = new Date(tomorrow);
    startUTC.setUTCHours(0, 0, 0, 0);

    endUTC = new Date(tomorrow);
    endUTC.setUTCHours(12, 59, 59, 999);
  } else {
    return res
      .status(400)
      .json({ error: "Invalid type. Use 'afternoon' or 'tomorning'." });
  }

  console.log("🔎 Type:", t);
  console.log(
    "⏱️ Range UTC:",
    startUTC.toISOString(),
    "—",
    endUTC.toISOString()
  );

  const databaseList = [ "dental_clinic"];
  //" uGiJQUeiwmJm1AHG" ,
  let totalSent = 0;

  for (const dbName of databaseList) {
    try {
      const pool = await getDbConnectionById(dbName);

      const appointments = await queryAppointments(pool, startUTC, endUTC);

      console.log(`📋 ${dbName} - Appointments found: ${appointments.length}`);

      for (const ap of appointments) {
        // ap.StartDate-г Date болгоно (DB-с string ирэх магадлалтай)
        const start = new Date(ap.StartDate);

        // Зөвхөн UTC формат:
        const startUtcStr = formatDateUTC(start);

        const hospital = ap.HospitalName ?? "";
        const patient = ap.PatientName ?? "";
        const doctor = ap.DoctorName ?? "";
        const phoneHospital = ap.HosPhone ?? "";
        const phonePatient: string | null = ap.PhoneNumber ?? null;

        const message =
          `Сайн байна уу? ${hospital} шүдний эмнэлэг байна. ` +
          `${patient} та ${startUtcStr}-д ${doctor} эмчид үзүүлэх цаг авсан байна. ` +
          `Утас: ${phoneHospital}`;

        console.log("✉️", message);

        if (!phonePatient) {
          console.log(`⚠️ No phone number for ${patient}`);
          continue;
        }

        try {
          await sendSMS(phonePatient, message);
          // await markSmsSent(pool, ap.UniqueID);
          await markSmsData(pool, ap.PersonPK, ap.UniqueID);
          totalSent++;
        } catch (err) {
          console.error(`❌ Failed to send to ${phonePatient}:`, err);
        }
      }
    } catch (err) {
      console.error(`❌ Failed for ${dbName}:`, err);
    }
  }

  return res.status(200).json({ success: true, totalSent });
}
