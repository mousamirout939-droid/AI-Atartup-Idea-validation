const StartupIdea = require('../models/startupideal');
const SWOT = require('../models/SWOT');
const { runSwotAnalysis } = require('../services/swotservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await runSwotAnalysis(idea, req.user._id);
  sendResponse(res, 200, { result }, 'SWOT analysis generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await SWOT.findOne({ idea: idea._id });
  if (!result) throw new ApiError(404, 'SWOT analysis has not been generated for this idea yet');

  sendResponse(res, 200, { result }, 'SWOT analysis fetched');
});

module.exports = { generate, getResult };
