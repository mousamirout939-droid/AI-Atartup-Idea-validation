const User = require('../models/user');
const StartupIdea = require('../models/startupideal');
const Feedback = require('../models/feedback');
const Payment = require('../models/payment');
const { getPlatformAnalytics } = require('../services/analyticsservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await getPlatformAnalytics();
  sendResponse(res, 200, { analytics }, 'Platform analytics fetched');
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search = '' } = req.query;
  const query = search
    ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
    : {};

  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await User.countDocuments(query);
  sendResponse(res, 200, { users, total, page: Number(page), pages: Math.ceil(total / limit) }, 'Users fetched');
});

const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');

  user.isActive = !user.isActive;
  await user.save();

  sendResponse(res, 200, { user: user.toSafeObject() }, `User ${user.isActive ? 'activated' : 'deactivated'}`);
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!['user', 'company', 'admin'].includes(role)) throw new ApiError(400, 'Invalid role');

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) throw new ApiError(404, 'User not found');

  sendResponse(res, 200, { user: user.toSafeObject() }, 'User role updated');
});

const getAllIdeas = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const query = status ? { status } : {};

  const ideas = await StartupIdea.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await StartupIdea.countDocuments(query);
  sendResponse(res, 200, { ideas, total, page: Number(page), pages: Math.ceil(total / limit) }, 'Ideas fetched');
});

const deleteIdeaAsAdmin = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findByIdAndDelete(req.params.id);
  if (!idea) throw new ApiError(404, 'Idea not found');
  sendResponse(res, 200, {}, 'Idea deleted by admin');
});

const getAllFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find().sort({ createdAt: -1 });
  sendResponse(res, 200, { feedback }, 'Feedback fetched');
});

const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!feedback) throw new ApiError(404, 'Feedback not found');
  sendResponse(res, 200, { feedback }, 'Feedback status updated');
});

const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ status: 'paid' })
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(100);
  sendResponse(res, 200, { payments }, 'Payments fetched');
});

module.exports = {
  getAnalytics,
  getAllUsers,
  toggleUserStatus,
  updateUserRole,
  getAllIdeas,
  deleteIdeaAsAdmin,
  getAllFeedback,
  updateFeedbackStatus,
  getAllPayments,
};
