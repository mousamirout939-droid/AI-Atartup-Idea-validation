const BusinessPlan = require('../models/businessplan');
const StartupIdea = require('../models/startupideal');
const { generateBusinessPlan } = require('./openAiservice');

const runBusinessPlan = async (idea, userId) => {
  const result = await generateBusinessPlan(idea);

  const record = await BusinessPlan.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.businessplan': true });
  return record;
};

module.exports = { runBusinessPlan };
