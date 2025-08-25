// pages/api/treatmentConsent/editPatient.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';
import { getDbConnectionById } from '@lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Зөвхөн PUT хүсэлт зөвшөөрнө' });
  }

  const {
    tenantId, pk, lastName, firstName, phone, BirthDate, cardNumber,
    address, gender, Register, email, profession, reason
  } = req.body || {};

  if (!tenantId || !pk) {
    return res.status(400).json({ message: 'tenantId, pk шаардлагатай' });
  }
  if (!firstName || !phone) {
    return res.status(400).json({ message: 'firstName, phone шаардлагатай' });
  }

  let birthDateParam: Date | null = null;
  if (BirthDate) {
    const d = new Date(BirthDate);
    if (!isNaN(+d)) birthDateParam = d;
  }

  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await getDbConnectionById(tenantId);

    const request = pool.request()
    .input('pk', sql.VarChar, pk)
      .input('tenantId', sql.VarChar, tenantId)
      .input('CardNumber', sql.VarChar, cardNumber)
      .input('FirstName', sql.NVarChar, firstName)
      .input('LastName', sql.NVarChar, lastName ?? null)
      .input('PhoneNumber', sql.VarChar, phone)
      .input('BirthDate', sql.DateTime2, birthDateParam)
      .input('Address', sql.NVarChar, address ?? null)
      .input('Gender', sql.NVarChar, gender ?? null)
      .input('Register', sql.VarChar, Register ?? null)
      .input('Email', sql.VarChar, email ?? null)
      .input('Profession', sql.NVarChar, profession ?? null)
      .input('Reason', sql.VarChar, reason ?? null);

    const result = await request.query(`
      UPDATE cPerson
      SET
        CardNumber = @CardNumber,
        FirstName = @firstName,
        LastName  = @lastName,
        PhoneNumber     = @PhoneNumber,
        BirthDate = @BirthDate,
        Address   = @address,
        Gender    = @gender,
        [Register]= @Register,
        Email     = @email,
        Profession= @profession,
        Reason    = @reason
      WHERE pk = @pk
    `);

    if (!result.rowsAffected || result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Бичлэг олдсонгүй' });
    }
    return res.status(200).json({ message: 'Амжилттай шинэчлэгдлээ' });
  } catch (error: any) {
    console.error('Update алдаа:', error);
    return res.status(500).json({ message: 'Хадгалах үед алдаа гарлаа', error: error.message });
  } finally {
    if (pool) await pool.close(); // ← зөв хаалт
  }
}
