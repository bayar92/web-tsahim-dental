import type { NextApiRequest, NextApiResponse } from 'next';
import { getDbConnectionById } from '@lib/db';
import sql from 'mssql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Зөвхөн POST хүсэлт зөвшөөрнө' });
  }

  const { tenantId, personId, questionnairePK, SignatureData, ...baseData } = req.body;

  if (!tenantId || !personId || !questionnairePK) {
    return res.status(400).json({ message: 'tenantId, personId эсвэл questionnairePK байхгүй байна' });
  }

  try {
    const pool = await getDbConnectionById(tenantId);

    await pool.request()
      .input('QuestionnairePK', sql.Int, questionnairePK)
      .input('PersonPK', sql.Int, personId)
      .input('CreatedDate', sql.DateTime, new Date())
      .input('BaseData', sql.NVarChar(sql.MAX), JSON.stringify(baseData))
      .input('Signature', sql.VarChar(sql.MAX), SignatureData?.replace(/^data:image\/png;base64,/, '') || null)
      .query(`
        INSERT INTO cQuestionnairePerson (
          QuestionnairePK,
          PersonPK,
          CreatedDate,
          BaseData,
          Signature
        ) VALUES (
          @QuestionnairePK,
          @PersonPK,
          @CreatedDate,
          @BaseData,
          @Signature
        )
      `);

    res.status(200).json({ message: 'Амжилттай хадгалагдлаа' });
  } catch (err) {
    console.error('❌ DB алдаа:', err);
    res.status(500).json({ message: 'DB хадгалалт дээр алдаа гарлаа' });
  }
}
