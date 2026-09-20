import { Notification } from "../../models/index.js";

export const getUserNotifications = async (userId) => {
  return await Notification.findAll({
    where: {
      Id_users: userId,
    },
    order: [["created_at", "DESC"]],
  });
};

export const getNotificationById = async (notificationId, userId) => {
  const notification = await Notification.findOne({
    where: {
      Id_notifications: notificationId,
      Id_users: userId,
    },
  });

  if (!notification) {
    const error = new Error("Notification introuvable.");
    error.statusCode = 404;
    throw error;
  }

  return notification;
};

export const markNotificationAsRead = async (
  notificationId,
  userId,
) => {
  const notification = await getNotificationById(
    notificationId,
    userId,
  );

  await notification.update({
    lu: true,
    updated_at: new Date(),
  });

  return notification;
};

export const deleteNotification = async (
  notificationId,
  userId,
) => {
  const notification = await getNotificationById(
    notificationId,
    userId,
  );

  await notification.destroy();

  return notification;
};

export const markAllNotificationsAsRead = async (userId) => {
  await Notification.update(
    {
      lu: true,
      updated_at: new Date(),
    },
    {
      where: {
        Id_users: userId,
        lu: false,
      },
    },
  );

  return true;
};