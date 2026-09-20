import {
    getUserNotifications,
    getNotificationById,
    markNotificationAsRead,
    deleteNotification,
    markAllNotificationsAsRead,
  } from "./notifications.service.js";
  
  export const allNotifications = async (req, res, next) => {
    try {
      const notifications = await getUserNotifications(
        req.user.id,
      );
  
      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const notification = async (req, res, next) => {
    try {
      const result = await getNotificationById(
        req.params.id,
        req.user.id,
      );
  
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const readNotification = async (req, res, next) => {
    try {
      const result = await markNotificationAsRead(
        req.params.id,
        req.user.id,
      );
  
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const readAllNotifications = async (req, res, next) => {
    try {
      await markAllNotificationsAsRead(req.user.id);
  
      res.status(200).json({
        success: true,
        message: "Toutes les notifications ont été marquées comme lues.",
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const removeNotification = async (req, res, next) => {
    try {
      await deleteNotification(
        req.params.id,
        req.user.id,
      );
  
      res.status(200).json({
        success: true,
        message: "Notification supprimée.",
      });
    } catch (error) {
      next(error);
    }
  };