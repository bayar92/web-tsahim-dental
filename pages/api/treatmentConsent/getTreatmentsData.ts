import type { NextApiRequest, NextApiResponse } from 'next';
import { getDbConnectionById } from '@lib/db';
import sql from 'mssql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tenantId } = req.query;
  if (!tenantId) {
    return res.status(400).json({ error: 'tenantId дутуу байна' });
  }

  try {
    const pool = await getDbConnectionById(tenantId as string);
    const result = await pool.request().query(`SELECT * FROM ${tenantId}[dbo].[cTreatmentConsent]`);
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'DB холболтын алдаа' });
  }
}
