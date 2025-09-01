import type { NextApiRequest, NextApiResponse } from "next";
import { getDbConnectionById, queryAppointments } from "@lib/db";
import { sendSMS } from "@lib/sms";
import { toZonedTime, format } from "date-fns-tz";
import { markSmsSent } from "@lib/db";
import { markSmsData } from "@lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;

  const timeZone = "Asia/Ulaanbaatar";

  let startLocal: Date, endLocal: Date;

  if (type === "afternoon") {
    const today = new Date();
    console.log(today);
    startLocal = new Date(today);
    startLocal.setUTCHours(12, 59, 59, 999);

    endLocal = new Date(today);
    endLocal.setUTCHours(23, 59, 59, 999);
  } else if (type === "tomorning") {
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getDate() + 1);

    startLocal = new Date(tomorrow);
    startLocal.setUTCHours(0, 0, 0, 0);

    endLocal = new Date(tomorrow);
    endLocal.setUTCHours(12, 59, 59, 999);

    console.log("startUtc:", startLocal.toISOString());
    console.log("endUtc:", endLocal.toISOString());
  } else {
    return res.status(400).json({ error: "Invalid type" });
  }

  const databaseList = ["uGiJQUeiwmJm1AHG", "dental_clinic"];

  let totalSent = 0;

  for (const dbName of databaseList) {
    try {
      const pool = await getDbConnectionById(dbName);
      const appointments = await queryAppointments(pool, startLocal, endLocal);

      console.log(`📋 ${dbName} - Appointments found:`, appointments.length);
      console.log("🔎 Type:", type);
      console.log("🔍 Date range1:", startLocal, "-", endLocal);
      console.log("📋 Found appointments:", appointments.length);

      for (const ap of appointments) {
        const d = new Date(`${ap.StartDate.toISOString().slice(0, 19)}+08:00`);
        const formatted = `${d.getFullYear()}.${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")} ${d
          .getHours()
          .toString()
          .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
        const message = `Сайн байна уу? ${ap.HospitalName} шүдний эмнэлэг байна. ${ap.PatientName} та ${formatted}-д ${ap.DoctorName} эмчид үзүүлэх цаг авсан байна.`;

        if (!ap.PhoneNumber) {
          console.log(`⚠️ No phone number for ${ap.PatientName}`);
          continue;
        }

        try {
          await sendSMS(ap.PhoneNumber, message);
          await markSmsSent(pool, ap.UniqueID);
          await markSmsData(pool, ap.PersonPK, ap.UniqueID);
          totalSent++;
        } catch (err) {
          console.error(`❌ Failed to send to ${ap.PhoneNumber}:`, err);
        }
      }
    } catch (err) {
      console.error(`❌ Failed for ${dbName}:`, err);
    }
  }
  return res.status(200).json({ success: true, totalSent });
}
