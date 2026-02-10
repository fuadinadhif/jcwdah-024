import multer from "multer";
import path from "node:path";

export const upload = multer({
  // storage configs
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExt = path.extname(file.originalname);
      cb(null, `${uniqueName}${fileExt}`);
    },
  }),

  // file filter configs
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },

  // file size configs
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
