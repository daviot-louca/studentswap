import { uploadMessagePhoto } from "./messages.service.js";

export const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Aucune photo fournie.",
      });
    }

    const result = await uploadMessagePhoto(req.file);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
