const openai = require('../config/openai');
const logger = require('../utils/logger');
const { ApiError } = require('../utils/apiresponse');
const prompts = require('../utils/prompts');

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

/**
 * Sends a { system, user } prompt pair to OpenAI and parses strict JSON back.
 * Centralizing this means every AI-powered module gets the same retry /
 * error-handling / JSON-safety behaviour for free.
 */
async function callOpenAIJson({ system, user }, { temperature = 0.7 } = {}) {
  if (!process.env.OPENAI_API_KEY) {
    throw new ApiError(503, 'AI service is not configured on the server (missing OPENAI_API_KEY)');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      temperature,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error('Empty response from AI model');

    try {
      return JSON.parse(raw);
    } catch (parseErr) {
      logger.error('Failed to parse AI JSON response:', raw);
      throw new ApiError(502, 'AI response could not be parsed. Please try again.');
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    logger.error('OpenAI request failed:', error.message);
    throw new ApiError(502, 'AI provider request failed. Please try again shortly.');
  }
}

const generateSWOT = (idea) => callOpenAIJson(prompts.swotPrompt(idea));
const generateMarketAnalysis = (idea) => callOpenAIJson(prompts.marketAnalysisPrompt(idea));
const generateCompetitorAnalysis = (idea) => callOpenAIJson(prompts.competitorPrompt(idea));
const generateInvestorScore = (idea) => callOpenAIJson(prompts.investorScorePrompt(idea));
const generateRevenueModel = (idea) => callOpenAIJson(prompts.revenueModelPrompt(idea));
const generateCostEstimate = (idea) => callOpenAIJson(prompts.costEstimatePrompt(idea));
const generateTechStack = (idea) => callOpenAIJson(prompts.techStackPrompt(idea));
const generateBusinessPlan = (idea) => callOpenAIJson(prompts.businessPlanPrompt(idea));
const generatePitchDeck = (idea) => callOpenAIJson(prompts.pitchDeckPrompt(idea));
const generateOverallValidation = (idea) =>
  callOpenAIJson(prompts.overallValidationPrompt(idea), { temperature: 0.5 });

module.exports = {
  callOpenAIJson,
  generateSWOT,
  generateMarketAnalysis,
  generateCompetitorAnalysis,
  generateInvestorScore,
  generateRevenueModel,
  generateCostEstimate,
  generateTechStack,
  generateBusinessPlan,
  generatePitchDeck,
  generateOverallValidation,
};
