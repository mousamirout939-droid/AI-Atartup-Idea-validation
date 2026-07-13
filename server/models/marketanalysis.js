const mongoose = require('mongoose');

const marketAnalysisSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    marketSize: { type: String, default: '' },
    growthRate: { type: String, default: '' },
    targetAudience: { type: String, default: '' },
    trends: [{ type: String }],
    barriers: [{ type: String }],
    opportunityScore: { type: Number, default: 0 },
    summary: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MarketAnalysis', marketAnalysisSchema);
