const MarketAnalysis = require('../models/marketanalysis');
const StartupIdea = require('../models/startupideal');
const { generateMarketAnalysis } = require('./openAiservice');

const runMarketAnalysis = async (idea, userId) => {
  const result = await generateMarketAnalysis(idea);

  const record = await MarketAnalysis.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.market': true });
  return record;
};

module.exports = { runMarketAnalysis };
