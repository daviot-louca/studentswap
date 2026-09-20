import {
    getNotations,
    getNotationById,
    createNotation,
    deleteNotation,
  } from "./notations.service.js";
  
  export const allNotations = async (req, res, next) => {
    try {
      const notations = await getNotations();
  
      res.status(200).json({
        success: true,
        data: notations,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const notation = async (req, res, next) => {
    try {
      const result = await getNotationById(req.params.id);
  
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const createNewNotation = async (req, res, next) => {
    try {
      const result = await createNotation(req.body);
  
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const removeNotation = async (req, res, next) => {
    try {
      const result = await deleteNotation(
        req.params.id,
        req.user.id
      );
  
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };