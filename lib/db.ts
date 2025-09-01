import sql from "mssql";
import { toZonedTime, format } from "date-fns-tz";
import { int } from "aws-sdk/clients/datapipeline";

export async function getDbConnectionById(id: string | number) {
  const dbName = `${id}`;

  const config: sql.config = {
    user: process.env.DENTAL_DB_USER,
    password: process.env.DENTAL_DB_PASS,
    server: process.env.DENTAL_DB_HOST!,
    port: Number(process.env.DENTAL_DB_PORT),
    database: dbName,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };

  try {
    const pool = await new sql.ConnectionPool(config).connect();
    return pool;
  } catch (err) {
    console.error("❌ Connection Error:", err);
    throw err;
  }
}

export async function queryAppointments(
  pool: sql.ConnectionPool,
  startDate: Date,
  endDate: Date
) {
  try {
    const timeZone = "Asia/Ulaanbaatar";
    const formattedStart = format(startDate, "yyyy-MM-dd HH:mm:ss", {
      timeZone,
    });
    const formattedEnd = format(endDate, "yyyy-MM-dd HH:mm:ss", { timeZone });
    console.log(formattedEnd, formattedStart);
    const result = await pool
      .request()
      .input("startDate", sql.DateTime, formattedStart)
      .input("endDate", sql.DateTime, formattedEnd).query(`
        SELECT 
          ap.UniqueID,
          CONCAT(LEFT(patient.LastName, 1), '. ', patient.FirstName) AS PatientName,
          CONCAT(LEFT(doctor.LastName, 1), '. ', doctor.FirstName) AS DoctorName,
          h.HospitalName,
          ap.StartDate,
          ap.EndDate,
          ap.Subject,
          ap.Location,
          ap.Description,
          patient.PhoneNumber
        FROM [dbo].[Appointments] ap
        LEFT JOIN [dbo].[cPerson] patient ON ap.PersonPK = patient.PK
        LEFT JOIN [dbo].[cPerson] doctor ON ap.DoctorId = doctor.PK
        CROSS JOIN [dbo].[cHospital] h
        WHERE ap.StartDate >= @startDate AND ap.StartDate < @endDate AND ap.smsStatus IS NULL
        ORDER BY ap.StartDate ASC;
      `);

    return result.recordset;
  } catch (err) {
    console.error("❌ Query Error:", err);
    return [];
  }
}

export async function markSmsSent(pool: sql.ConnectionPool, uniqueId: number) {
  await pool.request().input("id", sql.Int, uniqueId) // BIGINT бол sql.BigInt
    .query(`
      UPDATE [dbo].[Appointments]
      SET smsStatus = 1
      WHERE UniqueID = @id;
    `);
}
