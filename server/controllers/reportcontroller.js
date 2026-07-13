const StartupIdea = require('../models/startupideal');
const Report = require('../models/report');
const SWOT = require('../models/SWOT');
const MarketAnalysis = require('../models/marketanalysis');
const Competitor = require('../models/competitor');
const InvestorScore = require('../models/investorscore');
const RevenueModel = require('../models/revenuemodel');
const CostEstimate = require('../models/costestimate');
const TechStack = require('../models/techstack');
const BusinessPlan = require('../models/businessplan');

const { generateIdeaReportPDF } = require('../services/pdfservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');
const { PLAN_LIMITS } = require('../utils/constants');

const exportPDF = asyncHandler(async (req, res) => {
  const idea = await StartupIdea.findOne({ _id: req.params.ideaId, user: req.user._id });
  if (!idea) throw new ApiError(404, 'Startup idea not found');

  const limit = PLAN_LIMITS[req.user.plan].exportsPerMonth;
  if (req.user.exportsUsedThisMonth >= limit) {
    throw new ApiError(403, `You've reached your ${req.user.plan} plan export limit of ${limit} this month.`);
  }

  const [swot, market, competitor, investor, revenue, cost, techstack, businessplan] = await Promise.all([
    SWOT.findOne({ idea: idea._id }),
    MarketAnalysis.findOne({ idea: idea._id }),
    Competitor.findOne({ idea: idea._id }),
    InvestorScore.findOne({ idea: idea._id }),
    RevenueModel.findOne({ idea: idea._id }),
    CostEstimate.findOne({ idea: idea._id }),
    TechStack.findOne({ idea: idea._id }),
    BusinessPlan.findOne({ idea: idea._id }),
  ]);

  const { fileName, url } = await generateIdeaReportPDF(idea, {
    swot,
    market,
    competitor,
    investor,
    revenue,
    cost,
    techstack,
    businessplan,
  });

  await Report.create({ idea: idea._id, user: req.user._id, format: 'pdf', fileUrl: url, fileName });

  req.user.exportsUsedThisMonth += 1;
  await req.user.save();

  sendResponse(res, 200, { url, fileName }, 'Report exported as PDF');
});

const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('idea', 'title');
  sendResponse(res, 200, { reports }, 'Reports fetched');
});

module.exports = { exportPDF, getMyReports };
