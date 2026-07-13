const CostEstimate = require('../models/costestimate');
const StartupIdea = require('../models/startupideal');
const { generateCostEstimate } = require('./openAiservice');

const runCostEstimate = async (idea, userId) => {
  const result = await generateCostEstimate(idea);

  const record = await CostEstimate.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.cost': true });
  return record;
};

module.exports = { runCostEstimate };
