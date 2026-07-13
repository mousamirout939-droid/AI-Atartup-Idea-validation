const StartupIdea = require('../models/startupideal');
const CostEstimate = require('../models/costestimate');
const { runCostEstimate } = require('../services/costservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await runCostEstimate(idea, req.user._id);
  sendResponse(res, 200, { result }, 'Cost estimate generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await CostEstimate.findOne({ idea: idea._id });
  if (!result) throw new ApiError(404, 'Cost estimate has not been generated for this idea yet');

  sendResponse(res, 200, { result }, 'Cost estimate fetched');
});

module.exports = { generate, getResult };
