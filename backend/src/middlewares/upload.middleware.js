import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDirectory = path.resolve(
  process.cwd(),
  "uploads",
  "articles",
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension =
      path.extname(file.originalname).toLowerCase();

    const filename = `${crypto.randomUUID()}${extension}`;

    callback(null, filename);
  },
});

const fileFilter = (_req, file, callback) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    return callback(
      new Error(
        "Format d'image non autorisé. Utilisez JPG, PNG ou WebP.",
      ),
    );
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

export const uploadArticlePhotos = upload.array(
  "photos",
  5,
);

export default upload;