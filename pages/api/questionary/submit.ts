import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userID, diseases, otherDisease, reason } = req.body;

    console.log('Ирсэн өгөгдөл:', {
      userID, diseases, otherDisease, reason
    });

    // Жишээ логик: өгөгдлийг DB-д хадгалах
    return res.status(200).json({ message: 'Амжилттай хадгаллаа' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
