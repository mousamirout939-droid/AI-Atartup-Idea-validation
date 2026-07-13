const PitchDeck = require('../models/pitchdeck');
const StartupIdea = require('../models/startupideal');
const { generatePitchDeck } = require('./openAiservice');

const runPitchDeckGeneration = async (idea, userId) => {
  const result = await generatePitchDeck(idea);

  const record = await PitchDeck.findOneAndUpdate(
    { idea: idea._id },
    { idea: idea._id, user: userId, slides: result.slides },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await StartupIdea.findByIdAndUpdate(idea._id, { 'analysisModules.pitchdeck': true });
  return record;
};

module.exports = { runPitchDeckGeneration };
