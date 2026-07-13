const { body, validationResult } = require('express-validator');
const { ApiError } = require('./apiresponse');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((e) => ({ field: e.path, message: e.msg }));
    return next(new ApiError(400, 'Validation failed', formatted));
  }
  next();
};

const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const ideaRules = [
  body('title').trim().notEmpty().withMessage('Idea title is required'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
  body('targetMarket').optional().trim(),
];

const forgotPasswordRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
];

const resetPasswordRules = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

module.exports = {
  validate,
  registerRules,
  loginRules,
  ideaRules,
  forgotPasswordRules,
  resetPasswordRules,
};
