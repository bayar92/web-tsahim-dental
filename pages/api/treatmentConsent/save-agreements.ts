import type { NextApiRequest, NextApiResponse } from 'next';
import { getDbConnectionById } from '@lib/db';
import sql from 'mssql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Зөвхөн POST зөвшөөрнө' });
  }

  const { tenantId, treatmentConsentPK, signatureBase64, personId } = req.body;
  if (!tenantId || !treatmentConsentPK || !signatureBase64) {
    return res.status(400).json({ message: 'Утгууд дутуу байна' });
  }

  try {
    const pool = await getDbConnectionById(tenantId);
    await pool.request()
      .input('PersonPK', sql.Int, personId)
      .input('TreatmentConsentPK', sql.Int, treatmentConsentPK)
      .input('SignatureFilePath', sql.VarChar(sql.MAX), signatureBase64)
      .input('CreatedDate', sql.DateTime, new Date())
      .input('CreatedBy', sql.Int, null)
      .query(`
        INSERT INTO cAgreement (
          PersonPK,
          TreatmentConsentPK,
          SignatureFilePath,
          CreatedDate,
          CreatedBy
        )
        VALUES (
          @PersonPK,
          @TreatmentConsentPK,
          @SignatureFilePath,
          @CreatedDate,
          @CreatedBy
        )
      `);

    res.status(200).json({ message: 'Амжилттай хадгалагдлаа' });
  } catch (err) {
    res.status(500).json({ message: 'DB алдаа' });
  }
}
