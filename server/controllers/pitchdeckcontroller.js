const StartupIdea = require('../models/startupideal');
const PitchDeck = require('../models/pitchdeck');
const Report = require('../models/report');
const { runPitchDeckGeneration } = require('../services/pitchdeckservice');
const { generatePitchDeckPPT } = require('../services/pptservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');
const { PLAN_LIMITS } = require('../utils/constants');

const generate = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const pitchDeck = await runPitchDeckGeneration(idea, req.user._id);
  sendResponse(res, 200, { pitchDeck }, 'Pitch deck content generated');
});

const getResult = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const pitchDeck = await PitchDeck.findOne({ idea: idea._id });
  if (!pitchDeck) throw new ApiError(404, 'Pitch deck has not been generated for this idea yet');

  sendResponse(res, 200, { pitchDeck }, 'Pitch deck fetched');
});

const exportPPT = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const limit = PLAN_LIMITS[req.user.plan].exportsPerMonth;
  if (req.user.exportsUsedThisMonth >= limit) {
    throw new ApiError(403, `You've reached your ${req.user.plan} plan export limit of ${limit} this month.`);
  }

  let pitchDeck = await PitchDeck.findOne({ idea: idea._id });
  if (!pitchDeck) pitchDeck = await runPitchDeckGeneration(idea, req.user._id);

  const { fileName, url } = await generatePitchDeckPPT(idea, pitchDeck);

  pitchDeck.pptUrl = url;
  await pitchDeck.save();

  await Report.create({ idea: idea._id, user: req.user._id, format: 'pptx', fileUrl: url, fileName });

  req.user.exportsUsedThisMonth += 1;
  await req.user.save();

  sendResponse(res, 200, { url, fileName }, 'Pitch deck exported as PPTX');
});

module.exports = { generate, getResult, exportPPT };
