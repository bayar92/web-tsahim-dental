// pages/api/treatmentConsent/addPatient.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';
import { getDbConnectionById } from '@lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Зөвхөн POST хүсэлт зөвшөөрнө' });
  }

  const { tenantId, pk, lastName, firstName, phone, BirthDate, address, gender, Register, email, profession, reason } = req.body;
  
  if (!phone || !firstName ) {
    return res.status(400).json({ message: 'Мэдээлэл дутуу байна' });
  }
  try {
    const pool = await getDbConnectionById(tenantId);

    await pool.request()
  .input('CardNumber', sql.Int, parseInt(pk))
  .input('LastName', sql.NVarChar(100), lastName || null)
  .input('FirstName', sql.NVarChar(100), firstName)
  .input('PhoneNumber', sql.VarChar(20), phone || null)
  .input('BirthDate', sql.Date, BirthDate || null)
  .input('Address', sql.NVarChar(200), address || null)
  .input('Gender', sql.NVarChar(80), gender || null)
  .input('Register', sql.NVarChar(20), Register || null)
  .input('Email', sql.NVarChar(100), email || null)
  .input('Profession', sql.NVarChar(100), profession || null)
  .input('Reason', sql.Int, reason || null)

  .query(`
    INSERT INTO cPerson (
      CardNumber,
      LastName,
      FirstName,
      PhoneNumber,
      BirthDate,
      Address,
      Gender,
      Register,
      Email,
      Profession,
      Reason,
      Age
    )
    VALUES (
      @CardNumber,
      @LastName,
      @FirstName,
      @PhoneNumber,
      @BirthDate,
      @Address,
      @Gender,
      @Register,
      @Email,
      @Profession,
      @Reason,
      DATEDIFF(YEAR, @BirthDate, GETDATE()) -
        CASE 
          WHEN MONTH(@BirthDate) > MONTH(GETDATE()) 
              OR (MONTH(@BirthDate) = MONTH(GETDATE()) AND DAY(@BirthDate) > DAY(GETDATE())) 
          THEN 1 
          ELSE 0 
        END
    )
  `);
    await pool.request()
    .input('nowDateTime', sql.DateTime, new Date())
    .query(`
      UPDATE cCardNumber
      SET CurrentNumber = CurrentNumber + 1,
          LastUpdate = @nowDateTime
    `);
      

    return res.status(200).json({ message: 'Амжилттай бүртгэгдлээ' });
  } catch (error: any) {
    console.error('Insert алдаа:', error);
    return res.status(500).json({ message: 'Хадгалах үед алдаа гарлаа', error: error.message });
  }
}
