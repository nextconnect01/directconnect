import { Notification } from "../models/notification.models.js";
import { User } from "../models/user.model.js";

export const getUserUnreadNotifications = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }

    const unreadNotifications = await Notification.find({
      recieversDetail: userId,
      isRead: false,
    });
    if (!unreadNotifications) {
      return res.status(400).json({
        message: "No Unread Notification found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Unread Notifications found",
      success: true,
      notifications: unreadNotifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getUserAllNotifications = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }
    const notifications = await Notification.find({
      recieversDetail: userId,
    })
      .sort({ createdAt: -1 })
      .populate({ path: "sendersDetail" });
    if (notifications.length === 0) {
      return res.status(200).json({
        message: "No notifications found",
        success: true,
        notifications: [],
      });
    }

    return res.status(200).json({
      message: "Notifications fetched successfully",
      success: true,
      notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteSingleNotification = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }
    const notificationId = req.params.id;
    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId
    );
    if (!deletedNotification) {
      return res.status(404).json({
        message: "Notification not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Notification Deleted from database",
      success: true,
      deletedNotification
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteUsersAllNotifications = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No such user found",
        success: false,
      });
    }

    const notifications = await Notification.find({ recieversDetail: userId });
    if (!notifications || notifications.length === 0) {
      return res.status(400).json({
        message: "No Notification found",
        success: false,
      });
    }
    const deletedNotications = await Notification.deleteMany({
      recieversDetail: userId,
    });
    if (!deletedNotications) {
      return res.status(400).json({
        message: "No Notification found to be delted",
        success: false,
      });
    }
    return res.status(200).json({
      message: "All notifications related to this user deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const markSingleNotification = async (req, res) => {
  try {
    const userId = req.id;
    const notificationId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      }
    );

    if (!updatedNotification) {
      return res.status(400).json({
        message: "No Notification Found To be marked as updated",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      success: true,
      updatedNotification,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const markAllUsersNotification = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }

    const updatedNotifications = await Notification.updateMany(
      { recieversDetail: userId },
      { $set: { isRead: true } }
    );
    if (!updatedNotifications) {
      return res.status(404).json({
        message: "No Notification present to be updated",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All The Notification of the users marked as read",
      success: true,
      updatedNotifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
