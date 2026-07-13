const StartupIdea = require('../models/startupideal');
const MarketAnalysis = require('../models/marketanalysis');
const { runMarketAnalysis } = require('../services/marketanalysisservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await runMarketAnalysis(idea, req.user._id);
  sendResponse(res, 200, { result }, 'Market analysis generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await MarketAnalysis.findOne({ idea: idea._id });
  if (!result) throw new ApiError(404, 'Market analysis has not been generated for this idea yet');

  sendResponse(res, 200, { result }, 'Market analysis fetched');
});

module.exports = { generate, getResult };
