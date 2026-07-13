const StartupIdea = require('../models/startupideal');
const TechStack = require('../models/techstack');
const { runTechStackSuggestion } = require('../services/techstackservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await runTechStackSuggestion(idea, req.user._id);
  sendResponse(res, 200, { result }, 'Tech stack suggestion generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const result = await TechStack.findOne({ idea: idea._id });
  if (!result) throw new ApiError(404, 'Tech stack suggestion has not been generated for this idea yet');

  sendResponse(res, 200, { result }, 'Tech stack suggestion fetched');
});

module.exports = { generate, getResult };
