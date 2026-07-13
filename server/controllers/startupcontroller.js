const StartupIdea = require('../models/startupideal');
const User = require('../models/user');
const SWOT = require('../models/SWOT');
const MarketAnalysis = require('../models/marketanalysis');
const Competitor = require('../models/competitor');
const InvestorScore = require('../models/investorscore');
const RevenueModel = require('../models/revenuemodel');
const CostEstimate = require('../models/costestimate');
const TechStack = require('../models/techstack');
const BusinessPlan = require('../models/businessplan');
const PitchDeck = require('../models/pitchdeck');
const Notification = require('../models/notification');

const { runSwotAnalysis } = require('../services/swotservice');
const { runMarketAnalysis } = require('../services/marketanalysisservice');
const { runCompetitorAnalysis } = require('../services/competitorservice');
const { runInvestorScore } = require('../services/investorscoreservice');
const { runRevenueModel } = require('../services/revenueservice');
const { runCostEstimate } = require('../services/costservice');
const { runTechStackSuggestion } = require('../services/techstackservice');
const { runBusinessPlan } = require('../services/businessplanservice');
const { runPitchDeckGeneration } = require('../services/pitchdeckservice');
const { generateOverallValidation } = require('../services/openAiservice');
const { sendAnalysisCompleteEmail } = require('../services/emailservice');

const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');
const { PLAN_LIMITS } = require('../utils/constants');

const checkAndResetMonthlyUsage = async (user) => {
  const now = new Date();
  const resetAt = new Date(user.usageResetAt);
  const monthsElapsed =
    (now.getFullYear() - resetAt.getFullYear()) * 12 + (now.getMonth() - resetAt.getMonth());

  if (monthsElapsed >= 1) {
    user.ideasUsedThisMonth = 0;
    user.exportsUsedThisMonth = 0;
    user.usageResetAt = now;
    await user.save();
  }
  return user;
};

const createIdea = asyncHandler(async (req, res) => {
  const user = await checkAndResetMonthlyUsage(req.user);
  const limit = PLAN_LIMITS[user.plan].ideasPerMonth;

  if (user.ideasUsedThisMonth >= limit) {
    throw new ApiError(
      403,
      `You've reached your ${user.plan} plan limit of ${limit} ideas this month. Upgrade to submit more.`
    );
  }

  const { title, description, industry, targetMarket, stage, tags } = req.body;

  const idea = await StartupIdea.create({
    user: user._id,
    title,
    description,
    industry,
    targetMarket,
    stage,
    tags,
    status: 'draft',
  });

  user.ideasUsedThisMonth += 1;
  await user.save();

  sendResponse(res, 201, { idea }, 'Startup idea created');
});

const getMyIdeas = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', status } = req.query;
  const query = { user: req.user._id };
  if (status) query.status = status;
  if (search) query.$text = { $search: search };

  const ideas = await StartupIdea.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await StartupIdea.countDocuments(query);

  sendResponse(res, 200, { ideas, total, page: Number(page), pages: Math.ceil(total / limit) }, 'Ideas fetched');
});

const getIdeaById = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.id, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const [swot, market, competitor, investor, revenue, cost, techstack, businessplan, pitchdeck] =
    await Promise.all([
      SWOT.findOne({ idea: idea._id }),
      MarketAnalysis.findOne({ idea: idea._id }),
      Competitor.findOne({ idea: idea._id }),
      InvestorScore.findOne({ idea: idea._id }),
      RevenueModel.findOne({ idea: idea._id }),
      CostEstimate.findOne({ idea: idea._id }),
      TechStack.findOne({ idea: idea._id }),
      BusinessPlan.findOne({ idea: idea._id }),
      PitchDeck.findOne({ idea: idea._id }),
    ]);

  sendResponse(
    res,
    200,
    { idea, analyses: { swot, market, competitor, investor, revenue, cost, techstack, businessplan, pitchdeck } },
    'Idea details fetched'
  );
});

const updateIdea = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!idea) throw new ApiError(404, 'Startup idea not found');
  sendResponse(res, 200, { idea }, 'Idea updated');
});

const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');
  sendResponse(res, 200, {}, 'Idea deleted');
});

/**
 * Runs the full AI validation suite (SWOT, market, competitor, investor
 * score, revenue model, cost estimate, tech stack, business plan) plus an
 * overall viability verdict, in parallel, then persists everything.
 */
const analyzeIdea = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.id, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  idea.status = 'analyzing';
  await idea.save();

  try {
    const [swot, market, competitor, investor, revenue, cost, techstack, businessplan, overall] =
      await Promise.all([
        runSwotAnalysis(idea, req.user._id),
        runMarketAnalysis(idea, req.user._id),
        runCompetitorAnalysis(idea, req.user._id),
        runInvestorScore(idea, req.user._id),
        runRevenueModel(idea, req.user._id),
        runCostEstimate(idea, req.user._id),
        runTechStackSuggestion(idea, req.user._id),
        runBusinessPlan(idea, req.user._id),
        generateOverallValidation(idea),
      ]);

    idea.status = 'completed';
    idea.viabilityScore = overall.viabilityScore;
    idea.verdict = overall.verdict;
    await idea.save();

    await Notification.create({
      user: req.user._id,
      type: 'analysis_complete',
      title: 'Analysis complete',
      message: `Your idea "${idea.title}" scored ${overall.viabilityScore}/100 — ${overall.verdict}`,
      link: `/ideas/${idea._id}`,
    });

    sendAnalysisCompleteEmail(req.user, idea).catch(() => {});

    sendResponse(
      res,
      200,
      {
        idea,
        overall,
        analyses: { swot, market, competitor, investor, revenue, cost, techstack, businessplan },
      },
      'Full AI validation complete'
    );
  } catch (error) {
    idea.status = 'failed';
    await idea.save();
    throw error;
  }
});

const generatePitchDeckForIdea = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.id, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const pitchDeck = await runPitchDeckGeneration(idea, req.user._id);
  sendResponse(res, 200, { pitchDeck }, 'Pitch deck content generated');
});

module.exports = {
  createIdea,
  getMyIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  analyzeIdea,
  generatePitchDeckForIdea,
};
