import multer from "multer";
import type { FileFilterCallback } from "multer";
import path from "node:path";
import fs from "node:fs";
import type { Request } from "express";

// 1. Tentukan folder upload
const uploadPath = path.join(process.cwd(), "public");

// 2. Memastikan folder tujuan upload benar-benar ada
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// 3. Menentukan strategi penyimpanan (disk storage)
const diskStorage = multer.diskStorage({
  // Tempat folder penyimpanan
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  // Rename file
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomNumbers = Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);

    const finalName = `${timestamp}-${randomNumbers}${ext}`;

    cb(null, finalName);
  },
});

// 4. File filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG are allowed"));
  }
};

// 5. Multer instance/client
export const upload = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
    // files: 5,
  },
});
