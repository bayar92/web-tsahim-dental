// pages/api/win/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const uploadDir = path.join(process.cwd(), "public", "uploads", "patient-photos");
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ multiples: false, maxFileSize: 10 * 1024 * 1024, uploadDir });

  form.parse(req, async (err, _fields, files) => {
    if (err) return res.status(400).json({ error: "Invalid form data" });

    try {
        const f = Array.isArray(files.file) ? files.file[0] : files.file;
        if (!f) {
        return res.status(400).json({ error: "No file uploaded" });
        }
      const ext = path.extname(f.originalFilename || "").toLowerCase() || ".jpg";
      const filename = `patient_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
      const finalPath = path.join(uploadDir, filename);

      // formidable түр сан дахь файлыг эцсийн байршил руу зөөх
      fs.renameSync(f.filepath, finalPath);

      // Ил харагдах зам — public/ доторхыг шууд serve-лэнэ
      const publicUrl = `/uploads/patient-photos/${filename}`;
      return res.status(200).json({ url: publicUrl });
    } catch (e) {
      return res.status(500).json({ error: "Upload failed" });
    }
  });
}
