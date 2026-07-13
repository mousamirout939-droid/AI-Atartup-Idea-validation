const Notification = require('../models/notification');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  const unreadCount = await Notification.countDocuments({ user: req.user._id, isRead: false });
  sendResponse(res, 200, { notifications, unreadCount }, 'Notifications fetched');
});

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) throw new ApiError(404, 'Notification not found');
  sendResponse(res, 200, { notification }, 'Notification marked as read');
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
  sendResponse(res, 200, {}, 'All notifications marked as read');
});

module.exports = { getMyNotifications, markAsRead, markAllAsRead };
