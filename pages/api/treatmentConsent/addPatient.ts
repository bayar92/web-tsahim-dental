// pages/api/treatmentConsent/addPatient.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';
import { getDbConnectionById } from '@lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Зөвхөн POST хүсэлт зөвшөөрнө' });
  }

  const { tenantId, pk, lastName, firstName, phone, BirthDate, address } = req.body;

  
  if (!lastName || !firstName || !BirthDate) {
    return res.status(400).json({ message: 'Мэдээлэл дутуу байна' });
  }
  try {
    const pool = await getDbConnectionById(tenantId);

    await pool.request()
      .input('CardNumber', sql.Int, parseInt(pk))
      .input('LastName', sql.NVarChar(100), lastName)
      .input('FirstName', sql.NVarChar(100), firstName)
      .input('PhoneNumber', sql.VarChar(20), phone || null)
      .input('BirthDate', sql.Date, new Date(BirthDate))
      .input('Address', sql.NVarChar(200), address || null)
      .query(`
        INSERT INTO cPerson (
          CardNumber,
          LastName,
          FirstName,
          PhoneNumber,
          BirthDate,
          Address
        )
        VALUES (
          @CardNumber,
          @LastName,
          @FirstName,
          @PhoneNumber,
          @BirthDate,
          @Address
        )
      `);

    return res.status(200).json({ message: 'Амжилттай бүртгэгдлээ' });
  } catch (error: any) {
    console.error('Insert алдаа:', error);
    return res.status(500).json({ message: 'Хадгалах үед алдаа гарлаа', error: error.message });
  }
}
