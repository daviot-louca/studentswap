import fs from "fs";
import path from "path";

export const uploadMessagePhoto = async (file) => {
  if (!file) {
    const error = new Error("Aucune photo fournie.");
    error.statusCode = 400;
    throw error;
  }

  const photoUrl = `/uploads/messages/${file.filename}`;

  return {
    photo_url: photoUrl,
  };
};

export const deleteMessagePhoto = async (photoUrl) => {
  if (!photoUrl) {
    return;
  }

  const filename = path.basename(photoUrl);

  const filePath = path.join(process.cwd(), "uploads", "messages", filename);

  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
  }
};
