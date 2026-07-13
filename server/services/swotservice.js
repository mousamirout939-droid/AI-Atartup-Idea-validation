const SWOT = require('../models/SWOT');
const StartupIdea = require('../models/startupideal');
const { generateSWOT } = require('./openAiservice');

const runSwotAnalysis = async (idea, userId) => {
  const result = await generateSWOT(idea);

  const record = await SWOT.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.swot': true });
  return record;
};

module.exports = { runSwotAnalysis };
