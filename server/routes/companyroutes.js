const express = require('express');
const router = express.Router();
const { getCompanyIdeas } = require('../controllers/startupcontroller');
const { protect } = require('../middleware/authmiddleware');
const { companyOnly } = require('../middleware/companymiddleware');

router.use(protect, companyOnly);
router.get('/ideas', getCompanyIdeas);

module.exports = router;