const RevenueModel = require('../models/revenuemodel');
const StartupIdea = require('../models/startupideal');
const { generateRevenueModel } = require('./openAiservice');

const runRevenueModel = async (idea, userId) => {
  const result = await generateRevenueModel(idea);

  const record = await RevenueModel.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.revenue': true });
  return record;
};

module.exports = { runRevenueModel };
