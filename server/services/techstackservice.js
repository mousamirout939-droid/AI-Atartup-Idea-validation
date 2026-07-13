const TechStack = require('../models/techstack');
const StartupIdea = require('../models/startupideal');
const { generateTechStack } = require('./openAiservice');

const runTechStackSuggestion = async (idea, userId) => {
  const result = await generateTechStack(idea);

  const record = await TechStack.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, ...result },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.techstack': true });
  return record;
};

module.exports = { runTechStackSuggestion };
