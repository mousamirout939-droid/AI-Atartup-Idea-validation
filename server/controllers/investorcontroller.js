const StartupIdea = require('../models/startupideal');
const InvestorScore = require('../models/investorscore');
const { runInvestorScore } = require('../services/investorscoreservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await runInvestorScore(idea, req.user._id);
  sendResponse(res, 200, { result }, 'Investor score generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await InvestorScore.findOne({ idea: idea._id });
  if (!result) throw new ApiError(404, 'Investor score has not been generated for this idea yet');

  sendResponse(res, 200, { result }, 'Investor score fetched');
});

module.exports = { generate, getResult };
