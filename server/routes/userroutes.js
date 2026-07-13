const express = require('express');
const router = express.Router();
const {
  updateProfile,
  changePassword,
  getUsageStats,
  deleteAccount,
  submitFeedback,
} = require('../controllers/usercontroller');
const { protect } = require('../middleware/authmiddleware');

router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.get('/usage', protect, getUsageStats);
router.delete('/account', protect, deleteAccount);
router.post('/feedback', submitFeedback); // public - works for guests and logged-in users

module.exports = router;
