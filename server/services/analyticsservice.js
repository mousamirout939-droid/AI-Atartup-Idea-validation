const User = require('../models/user');
const StartupIdea = require('../models/startupideal');
const Payment = require('../models/payment');
const Feedback = require('../models/feedback');

async function getPlatformAnalytics() {
  const [totalUsers, totalIdeas, completedIdeas, revenueAgg, planBreakdown, ideasByIndustry, signupsLast30] =
    await Promise.all([
      User.countDocuments(),
      StartupIdea.countDocuments(),
      StartupIdea.countDocuments({ status: 'completed' }),
      Payment.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      User.aggregate([{ $group: { _id: '$plan', count: { $sum: 1 } } }]),
      StartupIdea.aggregate([{ $group: { _id: '$industry', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 8 }]),
      User.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

  const avgScoreAgg = await StartupIdea.aggregate([
    { $match: { viabilityScore: { $ne: null } } },
    { $group: { _id: null, avg: { $avg: '$viabilityScore' } } },
  ]);

  return {
    totalUsers,
    totalIdeas,
    completedIdeas,
    totalRevenue: revenueAgg[0]?.total || 0,
    averageViabilityScore: Math.round(avgScoreAgg[0]?.avg || 0),
    planBreakdown,
    ideasByIndustry,
    signupsLast30Days: signupsLast30,
    pendingFeedback: await Feedback.countDocuments({ status: 'new' }),
  };
}

module.exports = { getPlatformAnalytics };
