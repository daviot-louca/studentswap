import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { uploadPhoto } from "./messages.controller.js";
import AuthMiddleware from "../../middlewares/auth.middlewares.js";

const router = express.Router();

const uploadDirectory = path.join(process.cwd(), "uploads", "messages");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${extension}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/heic",
    "image/heif",
  ];

  console.log("📷 Fichier reçu par Multer :", {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
  });

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  console.error("❌ Type de fichier refusé :", file.mimetype);

  cb(
    new Error(
      "Format de fichier non autorisé. Utilisez JPG, PNG, WEBP, GIF, HEIC ou HEIF.",
    ),
    false,
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
});

router.post(
  "/photo",
  AuthMiddleware,
  (req, res, next) => {
    upload.single("photo")(req, res, (error) => {
      if (error) {
        console.error("❌ Erreur Multer upload photo :", error);

        if (error instanceof multer.MulterError) {
          if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              error: "La photo ne doit pas dépasser 10 Mo.",
            });
          }

          return res.status(400).json({
            success: false,
            error: error.message,
          });
        }

        return res.status(400).json({
          success: false,
          error: error.message || "Impossible d'envoyer la photo.",
        });
      }

      console.log("✅ Upload Multer terminé :", {
        file: req.file
          ? {
              fieldname: req.file.fieldname,
              originalname: req.file.originalname,
              filename: req.file.filename,
              mimetype: req.file.mimetype,
              size: req.file.size,
              path: req.file.path,
            }
          : null,
      });

      next();
    });
  },
  uploadPhoto,
);

export default router;
