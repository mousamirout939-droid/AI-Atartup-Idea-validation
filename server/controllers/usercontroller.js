const User = require('../models/user');
const Feedback = require('../models/feedback');

const StartupIdea = require('../models/startupideal');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { ...(name && { name }), ...(avatar && { avatar }) },
    { new: true, runValidators: true }
  );

  sendResponse(res, 200, { user: user.toSafeObject() }, 'Profile updated');
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  sendResponse(res, 200, {}, 'Password changed successfully');
});

const getUsageStats = asyncHandler(async (req, res) => {
  const { PLAN_LIMITS } = require('../utils/constants');
  const limits = PLAN_LIMITS[req.user.plan];

  const totalIdeas = await StartupIdea.countDocuments({ user: req.user._id });

  sendResponse(
    res,
    200,
    {
      plan: req.user.plan,
      ideasUsedThisMonth: req.user.ideasUsedThisMonth,
      exportsUsedThisMonth: req.user.exportsUsedThisMonth,
      limits,
      totalIdeas,
    },
    'Usage stats fetched'
  );
});

const deleteAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { isActive: false });
  sendResponse(res, 200, {}, 'Account deactivated');
});

const submitFeedback = asyncHandler(async (req, res) => {
  const { name, email, subject, message, rating } = req.body;
  const feedback = await Feedback.create({
    user: req.user ? req.user._id : undefined,
    name,
    email,
    subject,
    message,
    rating,
  });
  sendResponse(res, 201, { feedback }, 'Feedback submitted, thank you!');
});

module.exports = { updateProfile, changePassword, getUsageStats, deleteAccount, submitFeedback };
