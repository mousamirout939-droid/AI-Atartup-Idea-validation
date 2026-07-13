const express = require('express');
const router = express.Router({ mergeParams: true });
const { generate, getResult } = require('../controllers/swotcontroller');
const { protect } = require('../middleware/authmiddleware');
const { aiLimiter } = require('../middleware/rarelimitmiddleware');

router.use(protect);

router.post('/:ideaId/generate', aiLimiter, generate);
router.get('/:ideaId', getResult);

module.exports = router;
