const express = require('express');
const router = express.Router();
const { exportPDF, getMyReports } = require('../controllers/reportcontroller');
const { protect } = require('../middleware/authmiddleware');

router.use(protect);

router.post('/:ideaId/export-pdf', exportPDF);
router.get('/', getMyReports);

module.exports = router;
