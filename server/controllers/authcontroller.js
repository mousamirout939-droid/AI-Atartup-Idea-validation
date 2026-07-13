const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const Subscription = require('../models/subscription');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../services/emailservice');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'An account with this email already exists');

  const user = await User.create({ name, email, password });
  await Subscription.create({ user: user._id, plan: 'free' });

  sendWelcomeEmail(user).catch(console.error);

  const token = signToken(user._id);
  sendResponse(res, 201, { user: user.toSafeObject(), token }, 'Account created successfully');
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (!user.isActive) throw new ApiError(403, 'This account has been deactivated');

  user.lastLoginAt = new Date();
  await user.save();

  const token = signToken(user._id);
  sendResponse(res, 200, { user: user.toSafeObject(), token }, 'Logged in successfully');
});

const getMe = asyncHandler(async (req, res) => {
  sendResponse(res, 200, { user: req.user.toSafeObject() }, 'Current user fetched');
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always respond the same way to avoid leaking which emails are registered
  if (!user) {
    return sendResponse(res, 200, {}, 'If that email exists, a reset link has been sent');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  sendPasswordResetEmail(user, resetUrl).catch(() => {});

  sendResponse(res, 200, {}, 'If that email exists, a reset link has been sent');
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: Date.now() },
  }).select('+resetPasswordToken +resetPasswordExpires');

  if (!user) throw new ApiError(400, 'Reset token is invalid or has expired');

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  sendResponse(res, 200, {}, 'Password reset successfully. You can now log in.');
});

module.exports = { register, login, getMe, forgotPassword, resetPassword };
