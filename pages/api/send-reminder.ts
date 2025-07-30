import type { NextApiRequest, NextApiResponse } from 'next';
import { getDbConnectionById, queryAppointments } from "@lib/db";
import { sendSMS } from '@lib/sms';
import { toZonedTime , format } from 'date-fns-tz';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { type } = req.query;

    const timeZone = 'Asia/Ulaanbaatar';

    let startLocal: Date, endLocal: Date;

    if (type === 'afternoon') {
        const today = new Date();
        today.setHours(13, 0, 0, 0);
        startLocal = new Date(today);

        endLocal = new Date();
        endLocal.setHours(23, 59, 59, 999);
    } else if (type === 'tomorning') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        startLocal = new Date(tomorrow);
        startLocal.setHours(0, 0, 0, 0);

        endLocal = new Date(tomorrow);
        endLocal.setHours(12, 59, 59, 999);
    } else {
        return res.status(400).json({ error: 'Invalid type' });
    }

    // Хүсвэл яг тухайн timezone-д тохируулсан Date объект гаргаж авч болно
    const startDate = toZonedTime(startLocal, timeZone);
    const endDate = toZonedTime(endLocal, timeZone);

    const databaseList = ['dental_clinic'];
    
    let totalSent = 0;

    for (const dbName of databaseList) {
        try {
            
            const pool = await getDbConnectionById(dbName);
            const appointments = await queryAppointments(pool, startLocal, endLocal);
           
            console.log(`📋 ${dbName} - Appointments found:`, appointments.length);
            console.log('🔎 Type:', type);
            console.log('🔍 Date range1:', startLocal, '-', endLocal);
            console.log('📋 Found appointments:', appointments.length);

            for (const ap of appointments) {
                const d = new Date(`${ap.StartDate.toISOString().slice(0, 19)}+08:00`);
                const formatted = `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
                const message = `Сайн байна уу? ${ap.HospitalName} шүдний эмнэлэг байна. ${ap.PatientName} та ${formatted}-д ${ap.DoctorName} эмчид үзүүлэх цаг авсан байна.`;

                if (!ap.PhoneNumber) {
                    console.log(`⚠️ No phone number for ${ap.PatientName}`);
                    continue;
                }

                try {
                    await sendSMS(ap.PhoneNumber, message);
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
