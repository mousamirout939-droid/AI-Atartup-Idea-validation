const StartupIdea = require('../models/startupideal');
const Competitor = require('../models/competitor');
const { runCompetitorAnalysis } = require('../services/competitorservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await runCompetitorAnalysis(idea, req.user._id);
  sendResponse(res, 200, { result }, 'Competitor analysis generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await Competitor.findOne({ idea: idea._id });
  if (!result) throw new ApiError(404, 'Competitor analysis has not been generated for this idea yet');

  sendResponse(res, 200, { result }, 'Competitor analysis fetched');
});

module.exports = { generate, getResult };
