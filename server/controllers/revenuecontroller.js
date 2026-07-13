const StartupIdea = require('../models/startupideal');
const RevenueModel = require('../models/revenuemodel');
const { runRevenueModel } = require('../services/revenueservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await runRevenueModel(idea, req.user._id);
  sendResponse(res, 200, { result }, 'Revenue model generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await RevenueModel.findOne({ idea: idea._id });
  if (!result) throw new ApiError(404, 'Revenue model has not been generated for this idea yet');

  sendResponse(res, 200, { result }, 'Revenue model fetched');
});

module.exports = { generate, getResult };
