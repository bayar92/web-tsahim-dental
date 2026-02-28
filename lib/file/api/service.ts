import { S3 } from "aws-sdk";
import { hash } from "bcryptjs";
import { PatientNoteFileType, QuestionFileType } from "../data/uploadHooks";
import { prisma } from "@api/prisma";
import { AppError } from "@util/errors";
import { getCurrentDate } from "@api/currentDate";
import crypto from "crypto";
import path from "path";
// const a = "TfU98ZqEfoqY7fCfn7Hfpf";
// const b = "HkkruMUZnJCJpe2/IT";
// const c = "AKIAS6QG57GCXVMA7GPM";
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,//process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY, //process.env.AWS_SECRET_ACCESS_KEY_F || a + b,
  region: "ap-northeast-2",
});

const bucket = "edental.mn"// process.env.AWS_BUCKET ? process.env.AWS_BUCKET : "";

const generateKey = async (fileName: string) => {
  const ext = path.extname(fileName) || "";   // ".jpg" гэх мэт
  const id = crypto.randomUUID();             // URL-safe
  return `${id}${ext}`;
};

export const getUploadKey = async (
  fileName: string,
  fileType: string
): Promise<{ signedRequest: string; url: string }> => {
  const key = await generateKey(fileName);
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: bucket,
        Key: key,
        ContentType: fileType,
      },
      (error, data) => {
        if (error) reject(error);
        resolve({
          signedRequest: data,
          url: `https://d33uusnjh2qh6s.cloudfront.net/${key}`,
        });
      }
    );
  });
};

const patientNotesSelect = {
  patientNoteId: true,
  fileCategory: true,
  fileGroup: true,
  fileLink: true,
  fileSource: true,
  fileSourceDate: true,
  id: true,
};
export const createQuestionFile = async (fileData: QuestionFileType) => {
  return await prisma.fileUpload.create({
    data: fileData,
    select: patientNotesSelect,
  });
};

export const deletePatientNoteFileToggle = async (fileData: {
  id: string;
  createdBy: string;
}) => {
  const total = await prisma.fileUpload.count({
    where: { id: fileData.id, createdBy: fileData.createdBy },
  });
  if (total < 1) throw AppError.NotFound("validation.file-upload.not-found");
  await prisma.fileUpload.update({
    where: { id: fileData.id },
    data: { removedAt: getCurrentDate() },
  });
};

export const getFileById = async (id: string) => {
  return await prisma.fileUpload.findUnique({
    where: { id },
    select: { fileLink: true },
  });
};
