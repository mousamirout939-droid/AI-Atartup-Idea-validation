const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getAllUsers,
  toggleUserStatus,
  updateUserRole,
  getAllIdeas,
  deleteIdeaAsAdmin,
  getAllFeedback,
  updateFeedbackStatus,
  getAllPayments,
} = require('../controllers/admincontroller');
const { protect } = require('../middleware/authmiddleware');
const { adminOnly } = require('../middleware/adminmiddleware');

router.use(protect, adminOnly);

router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.put('/users/:id/role', updateUserRole);
router.get('/ideas', getAllIdeas);
router.delete('/ideas/:id', deleteIdeaAsAdmin);
router.get('/feedback', getAllFeedback);
router.put('/feedback/:id/status', updateFeedbackStatus);
router.get('/payments', getAllPayments);

module.exports = router;
