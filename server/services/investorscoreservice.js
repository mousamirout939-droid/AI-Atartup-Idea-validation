const InvestorScore = require('../models/investorscore');
const StartupIdea = require('../models/startupideal');
const { generateInvestorScore } = require('./openAiservice');

const runInvestorScore = async (idea, userId) => {
  const result = await generateInvestorScore(idea);

  const record = await InvestorScore.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.investor': true });
  return record;
};

module.exports = { runInvestorScore };
