const Competitor = require('../models/competitor');
const StartupIdea = require('../models/startupideal');
const { generateCompetitorAnalysis } = require('./openAiservice');

const runCompetitorAnalysis = async (idea, userId) => {
  const result = await generateCompetitorAnalysis(idea);

  const record = await Competitor.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.competitor': true });
  return record;
};

module.exports = { runCompetitorAnalysis };
