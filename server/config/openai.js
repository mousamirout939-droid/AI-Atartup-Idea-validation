const OpenAI = require('openai');
const logger = require('../utils/logger');

if (!process.env.OPENAI_API_KEY) {
  logger.warn('OPENAI_API_KEY is not set. AI-powered endpoints will fail until it is configured.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'missing-key',
});

module.exports = openai;
