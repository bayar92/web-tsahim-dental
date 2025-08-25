// pages/api/treatmentConsent/getPatient.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';
import { getDbConnectionById } from '@lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Зөвхөн GET' });
  }

  const tenantId = (req.query.tenantId as string) || '';
  const pk = (req.query.pk as string) || '';

  if (!tenantId || !pk) {
    return res.status(400).json({ message: 'tenantId болон pk шаардлагатай' });
  }
  let pool: sql.ConnectionPool | null = null;
  try {
    const pool = await getDbConnectionById(tenantId);
    const result = await pool.request()
      .input('tenantId', sql.VarChar, tenantId)
      .input('pk', sql.VarChar, pk)
      .query(`
        SELECT TOP (1)
          CardNumber,
          FirstName,
          LastName,
          PhoneNumber,
          BirthDate,
          Address,
          Gender,
          [Register],
          Email,
          Profession,
          Reason
        FROM cPerson
        WHERE pk = @pk
      `);
        console.log(result);
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Олдсонгүй' });
    }
    return res.status(200).json(result.recordset[0]);
  } catch (error: any) {
    console.error('Fetch алдаа:', error);
    return res.status(500).json({ message: 'Алдаа гарлаа', error: error?.message });
  } 
}
