// Central place for every OpenAI prompt template used across the app.
// Each function returns a { system, user } pair fed to openAiservice.

const baseContext = (idea) => `
Startup Idea Title: ${idea.title}
Description: ${idea.description}
Industry: ${idea.industry}
Target Market: ${idea.targetMarket || 'Not specified'}
Stage: ${idea.stage || 'idea'}
`;

const jsonInstruction = 'Respond with STRICT valid JSON only. No markdown, no code fences, no commentary outside the JSON object.';

module.exports = {
  swotPrompt: (idea) => ({
    system: `You are a senior startup strategy consultant. ${jsonInstruction}`,
    user: `Analyze the following startup idea and produce a SWOT analysis.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "strengths": ["string", ...4-6 items],
  "weaknesses": ["string", ...4-6 items],
  "opportunities": ["string", ...4-6 items],
  "threats": ["string", ...4-6 items],
  "summary": "2-3 sentence overall summary"
}`,
  }),

  marketAnalysisPrompt: (idea) => ({
    system: `You are a market research analyst. ${jsonInstruction}`,
    user: `Analyze the market for the following startup idea.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "marketSize": "string, estimated TAM in USD e.g. '$4.2B'",
  "growthRate": "string, e.g. '12% CAGR'",
  "targetAudience": "string describing the ideal customer profile",
  "trends": ["string", ...3-5 current market trends],
  "barriers": ["string", ...2-4 entry barriers],
  "opportunityScore": number (0-100),
  "summary": "3-4 sentence narrative summary"
}`,
  }),

  competitorPrompt: (idea) => ({
    system: `You are a competitive intelligence analyst. ${jsonInstruction}`,
    user: `Identify realistic competitors for this startup idea and analyze them.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "competitors": [
    { "name": "string", "description": "string", "strengths": ["string"], "weaknesses": ["string"], "estimatedMarketShare": "string" }
    ... 3-5 competitors
  ],
  "competitiveAdvantage": "string describing this idea's potential edge",
  "differentiationScore": number (0-100),
  "summary": "3-4 sentence summary"
}`,
  }),

  investorScorePrompt: (idea) => ({
    system: `You are an experienced venture capital investor evaluating pitches. ${jsonInstruction}`,
    user: `Score this startup idea the way an investor would before a first meeting.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "overallScore": number (0-100),
  "criteria": {
    "marketPotential": number (0-100),
    "teamFeasibility": number (0-100),
    "innovation": number (0-100),
    "scalability": number (0-100),
    "revenueModel": number (0-100)
  },
  "investmentReadiness": "string, one of: 'Not Ready', 'Early Stage', 'Investable', 'Highly Investable'",
  "strengths": ["string", ...3 items],
  "concerns": ["string", ...3 items],
  "recommendation": "2-3 sentence investor-style recommendation"
}`,
  }),

  revenueModelPrompt: (idea) => ({
    system: `You are a startup finance strategist. ${jsonInstruction}`,
    user: `Suggest a revenue model and 3-year revenue projection for this startup idea.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "suggestedModels": ["string", ...2-4 revenue model types, e.g. 'Subscription (SaaS)'],
  "primaryModel": "string, the single best-fit model",
  "pricingStrategy": "string describing suggested pricing approach",
  "projections": [
    { "year": 1, "revenue": number, "customers": number },
    { "year": 2, "revenue": number, "customers": number },
    { "year": 3, "revenue": number, "customers": number }
  ],
  "revenueStreams": ["string", ...2-4 items],
  "summary": "2-3 sentence summary"
}`,
  }),

  costEstimatePrompt: (idea) => ({
    system: `You are a startup financial planner. ${jsonInstruction}`,
    user: `Estimate the startup and first-year operating costs for this idea (assume a lean team, USD).
${baseContext(idea)}
Return JSON with this exact shape:
{
  "oneTimeCosts": [ { "item": "string", "amount": number } ],
  "monthlyCosts": [ { "item": "string", "amount": number } ],
  "estimatedTotalFirstYear": number,
  "fundingRecommendation": "string, e.g. 'Bootstrap' or 'Raise $250K seed round'",
  "breakEvenEstimate": "string, e.g. '18 months'",
  "summary": "2-3 sentence summary"
}`,
  }),

  techStackPrompt: (idea) => ({
    system: `You are a senior software architect advising early-stage startups. ${jsonInstruction}`,
    user: `Recommend a practical, cost-effective tech stack for building an MVP of this startup idea.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "frontend": ["string", ...2-3 technologies],
  "backend": ["string", ...2-3 technologies],
  "database": ["string", ...1-2 technologies],
  "hosting": ["string", ...1-2 technologies],
  "thirdPartyServices": ["string", ...2-4 services e.g. Stripe, Auth0],
  "estimatedBuildTime": "string, e.g. '8-12 weeks for MVP'",
  "reasoning": "2-3 sentence reasoning behind these choices"
}`,
  }),

  businessPlanPrompt: (idea) => ({
    system: `You are a business plan writer for startup founders. ${jsonInstruction}`,
    user: `Write a concise business plan outline for this startup idea.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "executiveSummary": "string, 3-4 sentences",
  "problemStatement": "string",
  "solution": "string",
  "businessModel": "string",
  "marketingStrategy": "string",
  "milestones": [ { "milestone": "string", "timeline": "string" } ],
  "risksAndMitigation": [ { "risk": "string", "mitigation": "string" } ]
}`,
  }),

  pitchDeckPrompt: (idea) => ({
    system: `You are a pitch deck consultant who has helped startups raise from top VCs. ${jsonInstruction}`,
    user: `Generate pitch deck slide content (text only, no design) for this startup idea.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "slides": [
    { "title": "Cover", "content": "string" },
    { "title": "Problem", "content": "string" },
    { "title": "Solution", "content": "string" },
    { "title": "Market Opportunity", "content": "string" },
    { "title": "Product", "content": "string" },
    { "title": "Business Model", "content": "string" },
    { "title": "Competition", "content": "string" },
    { "title": "Traction", "content": "string" },
    { "title": "Team", "content": "string" },
    { "title": "Financials", "content": "string" },
    { "title": "The Ask", "content": "string" }
  ]
}`,
  }),

  overallValidationPrompt: (idea) => ({
    system: `You are the lead analyst producing a final go/no-go validation verdict for a startup idea. ${jsonInstruction}`,
    user: `Give a final validation verdict for this startup idea, considering market viability, feasibility and risk.
${baseContext(idea)}
Return JSON with this exact shape:
{
  "viabilityScore": number (0-100),
  "verdict": "string, one of: 'Strong Potential', 'Promising with Risks', 'Needs Refinement', 'Not Recommended'",
  "keyInsights": ["string", ...3-5 items],
  "nextSteps": ["string", ...3-5 actionable items],
  "summary": "3-4 sentence executive summary"
}`,
  }),
};
