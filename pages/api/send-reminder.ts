import type { NextApiRequest, NextApiResponse } from "next";
import { getDbConnectionById, queryAppointments } from "@lib/db";
import { sendSMS } from "@lib/sms";
import { markSmsSent } from "@lib/db";
import { markSmsData } from "@lib/db";

type HandlerType = "afternoon" | "tomorning";

function cyrillicToLatin(text: string) {
  const map = {
    А: "A",
    а: "a",
    Б: "B",
    б: "b",
    В: "V",
    в: "v",
    Г: "G",
    г: "g",
    Д: "D",
    д: "d",
    Е: "E",
    е: "e",
    Ё: "Yo",
    ё: "yo",
    Ж: "J",
    ж: "j",
    З: "Z",
    з: "z",
    И: "I",
    и: "i",
    Й: "I",
    й: "i",
    К: "K",
    к: "k",
    Л: "L",
    л: "l",
    М: "M",
    м: "m",
    Н: "N",
    н: "n",
    О: "O",
    о: "o",
    Ө: "U",
    ө: "u",
    П: "P",
    п: "p",
    Р: "R",
    р: "r",
    С: "S",
    с: "s",
    Т: "T",
    т: "t",
    У: "U",
    у: "u",
    Ү: "U",
    ү: "u",
    Ф: "F",
    ф: "f",
    Х: "Kh",
    х: "kh",
    Ц: "Ts",
    ц: "ts",
    Ч: "Ch",
    ч: "ch",
    Ш: "Sh",
    ш: "sh",
    Щ: "Sh",
    щ: "sh",
    Ъ: "",
    ъ: "",
    Ы: "Y",
    ы: "y",
    Ь: "",
    ь: "",
    Э: "E",
    э: "e",
    Ю: "Yu",
    ю: "yu",
    Я: "Ya",
    я: "ya",
  };

  return text
    .split("")
    .map((ch: string) => map[ch as keyof typeof map] ?? ch)
    .join("");
}

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
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  if (t === "tomorning") {
    startUTC = new Date(tomorrow);
    startUTC.setUTCHours(13, 0, 0, 0);
    console.log("tomorning");
    endUTC = new Date(tomorrow);
    endUTC.setUTCHours(23, 59, 59, 999);
  } else if (t === "afternoon") {
    console.log("afternoon");
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

  const databaseList = [
    "uGiJQUeiwmJm1AHG",
    "X8CLKeswvlaIcj5z",
    "VV1tS59yQZQtxjhK",
    // "iUEmbWAl8RlHe2L3",
    "dental_clinic",
  ];
  //
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

        const doctorLatin = cyrillicToLatin(doctor);
        const patientLatin = cyrillicToLatin(patient);
        const hospitalLatin = cyrillicToLatin(hospital);

        // const message =
        //   `Sain bn uu? ${hospitalLatin} shudnii emneleg baina. ` +
        //   `${patientLatin} ta ${startUtcStr}-d ${doctorLatin} emchid uzuulekh tsag avsan baina. ` +
        //   `Utas: ${phoneHospital}`;

        const message =
          `Sain bn uu? ${hospitalLatin} shudnii emneleg baina.` +
          `Ta ${startUtcStr}-d ${doctorLatin} emchid uzuulekh tsag avsan baina.` +
          `Utas: ${phoneHospital}`;

        console.log("✉️", message);

        if (!phonePatient) {
          console.log(`⚠️ No phone number for ${patient}`);
          continue;
        }

        try {
          await sendSMS(phonePatient, message);
          await markSmsSent(pool, ap.UniqueID);
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
