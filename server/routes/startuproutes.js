const express = require('express');
const router = express.Router();
const {
  createIdea,
  getMyIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  analyzeIdea,
} = require('../controllers/startupcontroller');
const { protect } = require('../middleware/authmiddleware');
const { aiLimiter } = require('../middleware/rarelimitmiddleware');
const { validate, ideaRules } = require('../middleware/validationmiddleware');

router.use(protect);

router.post('/', ideaRules, validate, createIdea);
router.get('/', getMyIdeas);
router.get('/:id', getIdeaById);
router.put('/:id', updateIdea);
router.delete('/:id', deleteIdea);
router.post('/:id/analyze', aiLimiter, analyzeIdea);

module.exports = router;
