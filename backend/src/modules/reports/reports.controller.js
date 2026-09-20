import {
    getAllReports,
    getReportById,
    createReport,
    deleteReport,
  } from "./reports.service.js";
  
  export const allReports = async (req, res, next) => {
    try {
      const reports = await getAllReports();
  
      res.status(200).json({
        success: true,
        data: reports,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const report = async (req, res, next) => {
    try {
      const result = await getReportById(req.params.id);
  
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const createNewReport = async (req, res, next) => {
    try {
      const result = await createReport(
        req.user.id,
        req.body.Id_articles,
        req.body.motif,
      );
  
      res.status(201).json({
        success: true,
        message: "Signalement créé.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const removeReport = async (req, res, next) => {
    try {
      await deleteReport(req.params.id);
  
      res.status(200).json({
        success: true,
        message: "Signalement supprimé.",
      });
    } catch (error) {
      next(error);
    }
  };