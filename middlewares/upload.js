import multer from "multer";
import { nanoid } from "nanoid";
import {
  UPLOAD_DIRECTORY,
  MAX_UPLOAD_SIZE,
  ALLOWED_FILE_TYPES,
} from "../config.js";

const storage = multer.diskStorage({
  destination: UPLOAD_DIRECTORY,
  filename: (req, file, cb) => {
    const fileName = file.originalname;

    console.log(`Uploading "${fileName}"`);

    cb(null, fileName);
  },
  limits: { fileSize: MAX_UPLOAD_SIZE },
});

// const fileFilter = (req, file, cb) => {
//   const fileType = file.mimetype;
//   const isForbiddenFile = !ALLOWED_FILE_TYPES.includes(fileType);

//   if (isForbiddenFile) {
//     console.error(`Forbidden file type: ${originalName}`);
//     return cb(new Error("Invalid file type"), false);
//   }

//   cb(null, isForbiddenFile);
// };

export const upload = multer({ storage: storage });
